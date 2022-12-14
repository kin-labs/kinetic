import { Box, Button, Code, Flex, Icon, Stack, Text, useDisclosure, useToast } from '@chakra-ui/react'
import { WebUiPropertyList } from '@kin-kinetic/web/app/ui'
import { AppEnv, Transaction } from '@kin-kinetic/web/util/sdk'
import { ButtonGroup } from '@saas-ui/react'
import { IconCopy } from '@tabler/icons'
import { ReactNode } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { MdError } from 'react-icons/md'
import Timeago from 'react-timeago'
import { WebTransactionTimeline } from './web-transaction-timeline'

function Copy({ value, label }: { value: string; label?: ReactNode }) {
  const toast = useToast()
  return (
    <CopyToClipboard text={value} onCopy={() => toast({ status: 'info', title: 'Copied to clipboard' })}>
      <Button p={2} variant={'outline'}>
        <IconCopy color="gray" size={16} />
        {label ? <Box mx={2}>{label}</Box> : null}
      </Button>
    </CopyToClipboard>
  )
}

export function WebTransactionDetail({ env, transaction }: { env: AppEnv; transaction: Transaction }) {
  const { isOpen: isRawOpen, onToggle: onRawToggle } = useDisclosure()
  const { isOpen: isSolanaOpen, onToggle: onSolanaToggle } = useDisclosure()
  const getExplorerUrl = (path: string) => env?.cluster?.explorer?.replace(`{path}`, path)

  return (
    <Stack spacing={{ base: 2, md: 6 }}>
      <WebTransactionTimeline env={env} transaction={transaction} />

      {transaction?.errors?.length && (
        <Box p="6" borderWidth="1px" borderRadius="lg">
          <Stack spacing={{ base: 2, md: 6 }}>
            {transaction.errors.map((error, idx) => (
              <Flex align="center" key={idx}>
                <Icon as={MdError} color={'red'} mr={2} />
                <Box fontWeight="bold">{error.message || 'Unknown error'}</Box>
              </Flex>
            ))}
          </Stack>
        </Box>
      )}

      <Box p="6" borderWidth="1px" borderRadius="lg">
        <WebUiPropertyList
          items={[
            { label: 'Created', value: <Timestamp timestamp={transaction.createdAt} /> },
            { label: 'Updated', value: <Timestamp timestamp={transaction.updatedAt} /> },
            { label: 'Status', value: transaction.status ? transaction.status : 'N/A' },
            { label: 'IP', value: `${transaction?.ip}` },
            { label: 'User Agent', value: `${transaction?.ua}` },
            { label: 'Fee Payer', value: `${transaction?.feePayer}` },
            { label: 'Source', value: transaction.source ? `${transaction?.source}` : 'N/A' },
            { label: 'Destination', value: transaction.destination ? `${transaction?.destination}` : 'N/A' },
            { label: 'Mint', value: `${transaction?.mint}` },
            { label: 'Decimals', value: transaction?.decimals ? `${transaction?.decimals}` : 'N/A' },
            { label: 'Amount', value: transaction.amount ? `${transaction?.amount}` : 'N/A' },
            { label: 'Reference ID', value: transaction.referenceId ? `${transaction?.referenceId}` : 'N/A' },
            { label: 'Reference Type', value: transaction.referenceType ? `${transaction?.referenceType}` : 'N/A' },
            {
              label: 'Signature',
              value: transaction.signature ? (
                <Stack direction="row">
                  <Copy label={<Code>{transaction.signature}</Code>} value={transaction.signature ?? ''} />

                  <Button as="a" href={getExplorerUrl(`tx/${transaction?.signature}`)} target="_blank">
                    View on Explorer
                  </Button>
                </Stack>
              ) : (
                'N/A'
              ),
            },
            {
              label: 'Solana TX',
              value: transaction.tx ? <Copy label="Copy to clipboard" value={transaction.tx ?? ''} /> : 'N/A',
            },
            {
              label: 'Solana Logs',
              value: transaction?.solanaTransaction?.meta?.logMessages ? (
                <Box as="pre" p="2" overflow="hidden" fontSize="xs">
                  {JSON.stringify(transaction?.solanaTransaction?.meta?.logMessages, null, 2)}
                </Box>
              ) : (
                'N/A'
              ),
            },
          ]}
        />
      </Box>

      <Box p="6" borderWidth="1px" borderRadius="lg">
        <ButtonGroup>
          <Button onClick={onRawToggle}>{isRawOpen ? 'Hide' : 'Show'} Raw Transaction</Button>
          <Button isDisabled={!transaction?.solanaTransaction} onClick={onSolanaToggle}>
            {isSolanaOpen ? 'Hide' : 'Show'} Solana Transaction
          </Button>
        </ButtonGroup>
        {isRawOpen && (
          <Box as="pre" p="2" overflow="hidden" fontSize="xs">
            {JSON.stringify(transaction, null, 2)}
          </Box>
        )}
        {isSolanaOpen && (
          <Box as="pre" p="2" overflow="hidden" fontSize="xs">
            {JSON.stringify(transaction?.solanaTransaction, null, 2)}
          </Box>
        )}
      </Box>
    </Stack>
  )
}

export function Timestamp({ timestamp }: { timestamp: string }) {
  return (
    <Flex>
      <Text mr={2}> {new Date(timestamp).toLocaleString()}</Text>
      <Timeago date={timestamp} />
    </Flex>
  )
}
