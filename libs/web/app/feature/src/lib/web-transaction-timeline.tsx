import { Box, Flex, HStack, Icon, Progress, Stack, Text } from '@chakra-ui/react'
import { AppEnv, Transaction, TransactionStatus } from '@kin-kinetic/web/util/sdk'
import { useMemo } from 'react'
import { IconType } from 'react-icons'
import { IoMdCloseCircleOutline } from 'react-icons/io'
import { MdError, MdRefresh, MdTaskAlt } from 'react-icons/md'

export type TransactionTimelineStatus = 'error' | 'disabled' | 'processing' | 'success'

export interface TransactionTimelineItem {
  status: TransactionTimelineStatus
  title: string
  value: number
}

function getTimelinePercentages(
  tx: Transaction,
  max: number,
): {
  processing: number
  solanaCommitted: number
  solanaFinalized: number
  total: number
  webhookEvent: number
  webhookVerify: number
} {
  const {
    processingDuration,
    solanaCommittedDuration,
    solanaFinalizedDuration,
    totalDuration,
    webhookEventDuration,
    webhookVerifyDuration,
  } = tx

  return {
    processing: Math.floor(((processingDuration || 0) * 100) / max),
    solanaCommitted: Math.floor(((solanaCommittedDuration || 0) * 100) / max),
    solanaFinalized: Math.floor(((solanaFinalizedDuration || 0) * 100) / max),
    total: Math.floor(((totalDuration || 0) * 100) / max),
    webhookEvent: Math.floor((((solanaCommittedDuration || 0) + (webhookEventDuration || 0)) * 100) / max),
    webhookVerify: Math.floor((((processingDuration || 0) + (webhookVerifyDuration || 1)) * 100) / max),
  }
}

function getTimelineStatuses(
  transaction: Transaction,
  env: AppEnv,
): {
  solanaCommittedStatus: TransactionTimelineStatus
  solanaFinalizedStatus: TransactionTimelineStatus
  processingStatus: TransactionTimelineStatus
  totalStatus: TransactionTimelineStatus
  webhookEventStatus: TransactionTimelineStatus
  webhookVerifyStatus: TransactionTimelineStatus
} {
  const finalStatus: TransactionTimelineStatus =
    transaction.status === TransactionStatus.Failed ? 'error' : 'processing'

  return {
    processingStatus: transaction.processingDuration ? 'success' : 'processing',
    solanaCommittedStatus: transaction?.signature ? 'success' : finalStatus,
    solanaFinalizedStatus: transaction?.solanaFinalizedDuration ? 'success' : finalStatus,
    totalStatus: transaction?.totalDuration ? 'success' : finalStatus,
    webhookEventStatus: env?.webhookEventEnabled
      ? transaction?.webhookEventDuration
        ? 'success'
        : 'processing'
      : 'disabled',
    webhookVerifyStatus: env?.webhookVerifyEnabled
      ? transaction?.webhookVerifyDuration
        ? 'success'
        : 'processing'
      : 'disabled',
  }
}

export function WebTransactionTimeline({ env, transaction }: { env: AppEnv; transaction: Transaction }) {
  const bars: TransactionTimelineItem[] = useMemo(() => {
    const { solanaCommitted, solanaFinalized, processing, total, webhookEvent, webhookVerify } = getTimelinePercentages(
      transaction,
      20_000,
    )
    const {
      solanaCommittedStatus,
      solanaFinalizedStatus,
      processingStatus,
      totalStatus,
      webhookEventStatus,
      webhookVerifyStatus,
    } = getTimelineStatuses(transaction, env)

    return [
      { status: 'success', title: 'Created', value: 0 },
      { status: processingStatus, title: 'Processing', value: processing || 1 },
      {
        status: webhookVerifyStatus,
        title: 'Verify webhook',
        value: webhookEvent || 1,
      },
      {
        status: solanaCommittedStatus,
        title: 'Solana committed',
        value: solanaCommitted || 1,
      },
      {
        status: webhookEventStatus,
        title: 'Event webhook',
        value: webhookVerify || 1,
      },
      {
        status: solanaFinalizedStatus,
        title: 'Solana finalized',
        value: solanaFinalized,
      },
      { status: totalStatus, title: 'Done', value: total },
    ]
  }, [env, transaction])

  const getColor = (status: TransactionTimelineStatus): string => {
    switch (status) {
      case 'error':
        return 'red'
      case 'disabled':
        return 'gray'
      case 'processing':
        return 'yellow'
      case 'success':
        return 'green'
      default:
        return 'gray'
    }
  }

  const getIcon = (status: TransactionTimelineStatus): IconType => {
    switch (status) {
      case 'error':
        return MdError
      case 'disabled':
        return IoMdCloseCircleOutline
      case 'processing':
        return MdRefresh
      case 'success':
        return MdTaskAlt
      default:
        return MdRefresh
    }
  }

  return (
    <Box p="6" borderWidth="1px" borderRadius="lg">
      <Stack spacing={5}>
        {bars?.map((bar, idx) => (
          <Flex key={idx} justify="space-between" align="center">
            <HStack w="200px">
              <Icon as={getIcon(bar.status)} color={getColor(bar.status)} />
              <Text>{bar?.title}</Text>
            </HStack>
            <Box flexGrow={1}>
              <Progress colorScheme="green" value={bar.value} />
            </Box>
          </Flex>
        ))}
      </Stack>
    </Box>
  )
}
