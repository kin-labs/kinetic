import { usePagination } from '@ajna/pagination'
import { CircularProgress, Code, Flex, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import { WebUiAlert } from '@kin-kinetic/web/ui/alert'
import { WebUiLoader } from '@kin-kinetic/web/ui/loader'
import { tableColumn, WebUiTable, WebUiTableColumn, WebUiTablePaginator } from '@kin-kinetic/web/ui/table'
import { Transaction, TransactionStatus } from '@kin-kinetic/web/util/sdk'
import { formatDistance, millisecondsToSeconds } from 'date-fns'
import { TransactionFilterIp } from './transaction-filter.ip'
import { TransactionFilterUa } from './transaction-filter.ua'
import { TransactionFilterReference } from './web-transaction-filter-reference'
import { TransactionFilterSignature } from './web-transaction-filter-signature'
import { TransactionFilterStatus } from './web-transaction-filter-status'
import { WebTransactionStatus } from './web-transaction-status'

const fields: WebUiTableColumn<Transaction>[] = [
  tableColumn<Transaction>('status', 'Status', {
    render: (tx: Transaction) => <WebTransactionStatus status={tx.status} />,
  }),
  tableColumn<Transaction>('signature', 'Signature', {
    render: (tx) => <Code colorScheme="primary">{ellipsify(tx.signature || '....')}</Code>,
  }),
  tableColumn<Transaction>('ip', 'IP'),
  tableColumn<Transaction>('ua', 'UA'),
  tableColumn<Transaction>('reference', 'Reference', {}),
  tableColumn<Transaction>('createdAt', 'Created', {
    render: (tx) => <div>{formatDistance(new Date(tx.createdAt).getTime(), Date.now())} ago</div>,
  }),
  tableColumn<Transaction>('totalDuration', 'Duration', {
    isNumeric: true,
    render: (tx) => (
      <Flex justifyContent="end">
        <TransactionDuration duration={tx.totalDuration} status={tx.status} />
      </Flex>
    ),
  }),
]

export function statusInProgress(status: TransactionStatus): boolean {
  return [TransactionStatus.Committed, TransactionStatus.Confirmed, TransactionStatus.Processing].includes(status)
}

export function TransactionDuration({
  duration,
  status,
}: {
  duration: number | null | undefined
  status: TransactionStatus
}) {
  const color = useColorModeValue('gray.300', 'gray.700')
  if (statusInProgress(status)) {
    return <CircularProgress color="primary.500" isIndeterminate size="4" trackColor={color} />
  }
  return <div>{duration ? `${millisecondsToSeconds(duration)} seconds` : 0}</div>
}

export function ellipsify(str = '', len = 4) {
  if (str.length > 30) {
    return str.substring(0, len) + '....' + str.substring(str.length - len, str.length)
  }
  return str
}

export function WebTransactionTable({
  loading,
  page,
  pageCount,
  pageSize,
  setPage,
  transactions,
}: {
  loading: boolean
  page: number
  pageCount: number
  pageSize: number
  setPage: (page: number) => void
  transactions: Transaction[]
}) {
  const { currentPage, setCurrentPage, pagesCount, pages } = usePagination({
    initialState: { currentPage: page, pageSize },
    pagesCount: pageCount,
    limits: { outer: 2, inner: 2 },
  })

  const handlePageChange = (page: number) => {
    setPage(page)
    setCurrentPage(page)
  }

  return (
    <Stack>
      <TransactionFilter />
      {loading && !transactions.length ? (
        <WebUiLoader />
      ) : transactions.length ? (
        <Stack>
          <WebUiTable<Transaction> data={transactions} columns={fields} />
          <WebUiTablePaginator
            currentPage={currentPage}
            setPage={handlePageChange}
            pagesCount={pagesCount}
            pages={pages}
          />
        </Stack>
      ) : (
        <WebUiAlert status="warning" message="No Transactions Found" />
      )}
    </Stack>
  )
}

export function TransactionFilter() {
  return (
    <Stack borderRadius="md" alignItems="center" direction="row" px={4} py={2}>
      <Text fontWeight="semibold" pt={0.5}>
        Filter by
      </Text>
      <TransactionFilterStatus />
      <TransactionFilterIp />
      <TransactionFilterUa />
      <TransactionFilterSignature />
      <TransactionFilterReference />
    </Stack>
  )
}
