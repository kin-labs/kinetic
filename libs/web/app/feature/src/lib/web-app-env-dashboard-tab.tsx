import { Box, SimpleGrid, Stack, Tag, Text, useColorModeValue } from '@chakra-ui/react'
import { ellipsify, WebUiPropertyList } from '@kin-kinetic/web/app/ui'
import { WebUiAlert } from '@kin-kinetic/web/ui/alert'
import { WebUiCard } from '@kin-kinetic/web/ui/card'
import { WebUiLoaderPage } from '@kin-kinetic/web/ui/loader'
import { WebUiPage } from '@kin-kinetic/web/ui/page'
import { App, AppEnv, TransactionStatus, useUserAppEnvStatsQuery, useUserWalletsQuery } from '@kin-kinetic/web/util/sdk'
import { Button, List, ListItem, ListItemLabel, ListItemTertiary } from '@saas-ui/react'
import { Link } from 'react-router-dom'

export function WebAppEnvDashboardTab({ app, env }: { app: App; env: AppEnv }) {
  const headerColor = useColorModeValue('gray.600', 'gray.300')
  const [{ data, error, fetching }] = useUserAppEnvStatsQuery({
    variables: { appEnvId: env.id },
  })

  const [{ data: wallets }] = useUserWalletsQuery({
    variables: { appEnvId: env.id },
  })

  if (fetching) {
    return <WebUiLoaderPage />
  }

  if (error) {
    return <WebUiAlert status="error" message={error.message} />
  }

  const count = data?.stats?.transactionCount || {}
  const stats = [
    TransactionStatus.Finalized,
    TransactionStatus.Failed,
    TransactionStatus.Committed,
    TransactionStatus.Confirmed,
    TransactionStatus.Processing,
  ]
  const config = {
    endpoint: env.endpoint,
    environment: env.name,
    index: app.index,
  }
  return (
    <WebUiPage>
      <Stack spacing={{ base: 2, md: 6, lg: 12 }}>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: 2, md: 6, lg: 12 }}>
          <WebUiCard>
            <Text fontSize="xl" fontWeight="bold" color={headerColor} mt={1}>
              Transactions
            </Text>
            <List>
              {stats.map((stat) => (
                <ListItem key={stat}>
                  <ListItemLabel primary={stat} />
                  <ListItemTertiary>
                    <Tag colorScheme="primary" borderRadius="full">
                      {count[stat]}
                    </Tag>
                  </ListItemTertiary>
                </ListItem>
              ))}
            </List>
            <Button as={Link} to={'../transactions'} variant="link" colorScheme={'primary'}>
              Go to transactions
            </Button>
          </WebUiCard>
          <WebUiCard>
            <Text fontSize="xl" fontWeight="bold" color={headerColor} mt={1}>
              Wallets
            </Text>
            <List>
              {wallets?.items?.map((wallet) => (
                <ListItem key={wallet.id}>
                  <ListItemLabel primary={ellipsify(wallet.publicKey ?? '')} />
                </ListItem>
              ))}
            </List>
            <Button as={Link} to={'../wallets'} variant="link" colorScheme={'primary'}>
              Go to wallets
            </Button>
          </WebUiCard>
          <WebUiCard>
            <Text fontSize="xl" fontWeight="bold" color={headerColor} mt={1}>
              Access
            </Text>
            <WebUiPropertyList
              items={[
                {
                  label: 'IPs Allowed',
                  value: `${env.ipsAllowed?.length ?? 'None'}`,
                },

                {
                  label: 'IPs Blocked',
                  value: `${env.ipsBlocked?.length ?? 'None'}`,
                },

                {
                  label: 'User Agents Allowed',
                  value: `${env.uasAllowed?.length ?? 'None'}`,
                },

                {
                  label: 'User Agents Blocked',
                  value: `${env.uasBlocked?.length ?? 'None'}`,
                },
              ]}
            />
            <Button as={Link} to={'../settings/access-control'} variant="link" colorScheme={'primary'}>
              Manage Access Control
            </Button>

            {/*<WebUiPropertyList*/}
            {/*  title={'Webhooks'}*/}
            {/*  items={[*/}
            {/*    {*/}
            {/*      label: 'Webhook Debugging',*/}
            {/*      value: `${env.webhookDebugging ? 'Enabled' : 'Disabled'}`,*/}
            {/*    },*/}
            {/*    {*/}
            {/*      label: 'Webhook Event',*/}
            {/*      value: `${env.webhookEventEnabled ? 'Enabled' : 'Disabled'}`,*/}
            {/*    },*/}
            {/*    {*/}
            {/*      label: 'Webhook Event Url',*/}
            {/*      value: `${env.webhookEventUrl || 'None'}`,*/}
            {/*    },*/}
            {/*    {*/}
            {/*      label: 'Webhook Verify',*/}
            {/*      value: `${env.webhookVerifyEnabled ? 'Enabled' : 'Disabled'}`,*/}
            {/*    },*/}
            {/*    {*/}
            {/*      label: 'Webhook Verify Url',*/}
            {/*      value: `${env.webhookVerifyUrl || 'None'}`,*/}
            {/*    },*/}
            {/*  ]}*/}
            {/*/>*/}
            {/*<Button*/}
            {/*  as={Link}*/}
            {/*  to={'../settings/webhooks'}*/}
            {/*  variant="link"*/}
            {/*  colorScheme={'primary'}*/}
            {/*>*/}
            {/*  Manage Webhooks*/}
            {/*</Button>*/}
          </WebUiCard>
        </SimpleGrid>
      </Stack>
    </WebUiPage>
  )
}
