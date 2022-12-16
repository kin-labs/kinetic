import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  ButtonGroup,
  Flex,
  Heading,
  Stack,
  Tag,
  Text,
  useToast,
} from '@chakra-ui/react'
import { WebUiAlert } from '@kin-kinetic/web/ui/alert'
import { WebUiCard } from '@kin-kinetic/web/ui/card'
import { WebUiPageHeader } from '@kin-kinetic/web/ui/page'
import {
  App,
  AppEnv,
  TransactionStatus,
  useUserAppEnvPurgeTransactionsMutation,
  useUserAppEnvStatsQuery,
} from '@kin-kinetic/web/util/sdk'
import { Button, List, ListItem, ListItemLabel, ListItemTertiary } from '@saas-ui/react'

export function WebAppEnvSettingsMaintenance({ env }: { app: App; env: AppEnv }) {
  const toast = useToast()
  const [, purgeTransactions] = useUserAppEnvPurgeTransactionsMutation()
  const [{ data }, refresh] = useUserAppEnvStatsQuery({
    variables: { appEnvId: env.id },
  })
  const count = data?.stats?.transactionCount || {}
  const stats = [
    TransactionStatus.Finalized,
    TransactionStatus.Failed,
    TransactionStatus.Committed,
    TransactionStatus.Confirmed,
    TransactionStatus.Processing,
  ]

  const purge = async (status?: TransactionStatus) => {
    const confirm = window.confirm(
      `Are you sure you want to purge ${status ? status : 'all'} transactions? This action cannot be undone.`,
    )
    if (confirm) {
      await purgeTransactions({ appEnvId: env.id, status })
      await refresh()
      toast({
        title: 'Transactions purged',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  const totalTransactionCount = data?.stats
    ? stats.reduce((acc, curr) => {
        if (!data?.stats?.transactionCount || !data?.stats?.transactionCount[curr]) {
          return acc
        }
        return acc + Number(data.stats.transactionCount[curr] ?? 0)
      }, 0)
    : 0

  return (
    <Stack spacing={{ base: 2, md: 6 }}>
      <Flex justify="space-between" align="start">
        <Box>
          <WebUiPageHeader title="Maintenance" />
          <Text ml={2} mt={2} color="gray.500">
            Here are some tools to maintain your environment.
          </Text>
        </Box>
      </Flex>
      <WebUiCard px={2}>
        <Accordion defaultIndex={[0]} allowMultiple>
          <AccordionItem>
            <AccordionButton alignItems="center">
              <Flex flex="1" alignItems="center">
                <Heading ml={2} size="md" mt={1}>
                  Purge Transactions
                </Heading>
              </Flex>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Stack spacing={4}>
                <Text ml={2} mt={2} color="gray.500">
                  You can purge all transactions from your environment. This will not affect your wallet balances.
                </Text>

                {totalTransactionCount < 1 ? (
                  <WebUiAlert status="info" message={'All transactions have been purged'} />
                ) : (
                  <Stack>
                    <List>
                      {stats
                        .filter((stat) => count[stat])
                        .map((stat) => {
                          const transactionCount = count[stat] ?? 0
                          return (
                            <ListItem key={stat}>
                              <ListItemLabel
                                primary={
                                  <ButtonGroup justifyContent="center">
                                    <Button size="xs" variant="outline" onClick={() => purge(stat)}>
                                      Purge {transactionCount} {stat} transactions
                                    </Button>{' '}
                                  </ButtonGroup>
                                }
                              />
                              <ListItemTertiary>
                                <Tag colorScheme="primary" borderRadius="full">
                                  {count[stat]} transactions
                                </Tag>
                              </ListItemTertiary>
                            </ListItem>
                          )
                        })}
                    </List>
                    <Box>
                      <Button disabled={totalTransactionCount < 1} size="xs" variant="outline" onClick={() => purge()}>
                        Purge all transactions
                      </Button>
                    </Box>
                  </Stack>
                )}
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </WebUiCard>
    </Stack>
  )
}
