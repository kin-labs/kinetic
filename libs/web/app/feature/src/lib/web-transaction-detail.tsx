import { Box, Button, Flex, Icon, Stack, useDisclosure } from '@chakra-ui/react'
import { WebUiPropertyList } from '@kin-kinetic/web/app/ui'
import { AppEnv, Transaction } from '@kin-kinetic/web/util/admin-sdk'
import { ButtonGroup } from '@saas-ui/react'
import { MdError } from 'react-icons/md'
import { WebTransactionTimeline } from './web-transaction-timeline'

export function WebTransactionDetail({ env, transaction }: { env: AppEnv; transaction: Transaction }) {
  const { isOpen: isRawOpen, onToggle: onRawToggle } = useDisclosure()
  const { isOpen: isSolanaOpen, onToggle: onSolanaToggle } = useDisclosure()
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
            { label: 'Fee Payer', value: `${transaction?.feePayer}` },
            { label: 'Mint', value: `${transaction?.mint}` },
            { label: 'Signature', value: `${transaction?.signature}` },
            { label: 'IP', value: `${transaction?.ip}` },
            { label: 'User Agent', value: `${transaction?.ua}` },
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
