import { Box, Stack } from '@chakra-ui/react'
import { AdminUiTabs } from '@mogami/admin/ui/tabs'
import { useAdminWalletQuery } from '@mogami/shared/util/admin-sdk'
import React from 'react'
import { Redirect, Route, Switch, useParams, useRouteMatch } from 'react-router-dom'

export default function AdminWalletFeatureDetail() {
  const { path, url } = useRouteMatch()
  const { walletId } = useParams<{ walletId: string }>()
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const [{ data }] = useAdminWalletQuery({ variables: { walletId: walletId! } })

  const tabs = [{ path: `${url}/overview`, label: 'Overview' }]
  return (
    <Stack direction="column" spacing={6}>
      <Box p="6" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" noOfLines={1}>
          {data?.item?.publicKey}
        </Box>
      </Box>
      <Switch>
        <Route path={path} exact render={() => <Redirect to={`${url}/overview`} />} />
        <Route
          path={`${path}/overview`}
          render={() => (
            <AdminUiTabs tabs={tabs}>
              <Box as="pre" fontSize="xs" color="gray.500">
                {JSON.stringify(data, null, 2)}
              </Box>
            </AdminUiTabs>
          )}
        />
      </Switch>
    </Stack>
  )
}
