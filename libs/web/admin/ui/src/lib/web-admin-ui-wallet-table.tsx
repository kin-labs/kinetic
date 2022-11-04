import { Box, Flex, Tag, TagLabel } from '@chakra-ui/react'
import { ShowSolBalance } from '@kin-kinetic/web/app/ui'
import { WebUiDataTable, WebUiDataTableLink } from '@kin-kinetic/web/ui/table'
import { AppEnv, Wallet } from '@kin-kinetic/web/util/sdk'
import { CellProps } from 'react-table'

export function WebAdminUiWalletTable({ wallets }: { wallets: Wallet[] }) {
  return (
    <WebUiDataTable<Wallet>
      data={wallets}
      columns={[
        {
          accessor: 'type',
          Header: 'Type',
        },
        {
          accessor: 'publicKey',
          Header: 'PublicKey',
          Cell: ({ row, value }: CellProps<Wallet>) => <WebUiDataTableLink to={row.original.id || ''} value={value} />,
        },
        {
          accessor: 'appEnvs',
          Header: 'App Envs',
          Cell: ({ value }: CellProps<Wallet>) => (
            <Box>
              {value.map((item: AppEnv) => (
                <Tag key={item?.key} size="sm" variant="subtle" colorScheme="primary">
                  <TagLabel>{item.key}</TagLabel>
                </Tag>
              ))}
            </Box>
          ),
        },
        {
          accessor: 'balances',
          Header: 'Balance',
          Cell: ({ value }: CellProps<Wallet>) => {
            return (
              <Flex justifyContent="end">
                {!Array.isArray(value) || !value?.length ? (
                  'Unknown'
                ) : (
                  <ShowSolBalance balance={value[0].balance || 0} />
                )}
              </Flex>
            )
          },
        },
      ]}
    />
  )
}
