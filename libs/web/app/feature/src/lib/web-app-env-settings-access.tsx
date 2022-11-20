import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react'
import {
  WebAppUiAppEnvAccessForm,
  WebWebhookUiBalanceForm,
  WebWebhookUiDebuggingForm,
  WebWebhookUiEventForm,
  WebWebhookUiVerifyForm,
} from '@kin-kinetic/web/app/ui'
import { WebUiCard } from '@kin-kinetic/web/ui/card'
import { WebUiPageHeader } from '@kin-kinetic/web/ui/page'
import {
  App,
  AppEnv,
  useUserAppEnvAddAllowedIpMutation,
  useUserAppEnvAddAllowedUaMutation,
  useUserAppEnvAddBlockedIpMutation,
  useUserAppEnvAddBlockedUaMutation,
  useUserAppEnvRemoveAllowedIpMutation,
  useUserAppEnvRemoveAllowedUaMutation,
  useUserAppEnvRemoveBlockedIpMutation,
  useUserAppEnvRemoveBlockedUaMutation,
} from '@kin-kinetic/web/util/sdk'
import { WebhookLabel } from './web-app-env-settings-webhooks'

export function WebAppEnvSettingsAccess({ app, env }: { app: App; env: AppEnv }) {
  const toast = useToast()
  const [, addAllowedIpMutation] = useUserAppEnvAddAllowedIpMutation()
  const [, addAllowedUaMutation] = useUserAppEnvAddAllowedUaMutation()
  const [, addBlockedIpMutation] = useUserAppEnvAddBlockedIpMutation()
  const [, addBlockedUaMutation] = useUserAppEnvAddBlockedUaMutation()
  const [, removeAllowedIpMutation] = useUserAppEnvRemoveAllowedIpMutation()
  const [, removeAllowedUaMutation] = useUserAppEnvRemoveAllowedUaMutation()
  const [, removeBlockedIpMutation] = useUserAppEnvRemoveBlockedIpMutation()
  const [, removeBlockedUaMutation] = useUserAppEnvRemoveBlockedUaMutation()

  const filterByIp = Boolean(env?.ipsAllowed?.length || env?.ipsBlocked?.length)
  const filterByUa = Boolean(env?.uasAllowed?.length || env?.uasBlocked?.length)

  return (
    <Stack spacing={{ base: 2, md: 6 }}>
      <Flex justify="space-between" align="start">
        <Box>
          <WebUiPageHeader title="Access Control" />
          <Text ml={2} mt={2} color="gray.500">
            Here you can control the access to your application.
          </Text>
        </Box>
        <Box mt={2} />
      </Flex>
      <WebUiCard px={2}>
        <Accordion defaultIndex={[filterByIp ? 0 : -1, filterByUa ? 1 : -1]} allowMultiple>
          <AccordionItem>
            <AccordionButton alignItems="center">
              <WebhookLabel title="By IP" enabled={filterByIp} />
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <SimpleGrid columns={{ base: 0, md: 2 }} gap={{ base: 2, md: 6, lg: 12 }}>
                <WebAppUiAppEnvAccessForm
                  title={'Allowed IPs'}
                  items={env.ipsAllowed || []}
                  addItem={(ip: string) => {
                    addAllowedIpMutation({ appEnvId: env.id, ip }).then(() =>
                      toast({ status: 'success', title: `Added Allowed IP ${ip}` }),
                    )
                  }}
                  removeItem={(ip: string) => {
                    removeAllowedIpMutation({ appEnvId: env.id, ip }).then(() =>
                      toast({
                        status: 'success',
                        title: `Removed Allowed IP ${ip}`,
                      }),
                    )
                  }}
                />
                <WebAppUiAppEnvAccessForm
                  title={'Blocked IPs'}
                  items={env.ipsBlocked || []}
                  addItem={(ip: string) => {
                    addBlockedIpMutation({ appEnvId: env.id, ip }).then(() =>
                      toast({ status: 'success', title: `Added Blocked IP ${ip}` }),
                    )
                  }}
                  removeItem={(ip: string) => {
                    removeBlockedIpMutation({ appEnvId: env.id, ip }).then(() =>
                      toast({
                        status: 'success',
                        title: `Removed Blocked IP ${ip}`,
                      }),
                    )
                  }}
                />
              </SimpleGrid>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionButton alignItems="center">
              <WebhookLabel title="By user agent" enabled={filterByUa} />
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <SimpleGrid columns={{ base: 0, md: 2 }} gap={{ base: 2, md: 6, lg: 12 }}>
                <WebAppUiAppEnvAccessForm
                  title={'Allowed User Agents'}
                  items={env.uasAllowed || []}
                  addItem={(ua: string) => {
                    addAllowedUaMutation({ appEnvId: env.id, ua }).then(() =>
                      toast({
                        status: 'success',
                        title: `Added Allowed User Agent ${ua}`,
                      }),
                    )
                  }}
                  removeItem={(ua: string) => {
                    removeAllowedUaMutation({ appEnvId: env.id, ua }).then(() =>
                      toast({
                        status: 'success',
                        title: `Removed Allowed User Agent ${ua}`,
                      }),
                    )
                  }}
                />
                <WebAppUiAppEnvAccessForm
                  title={'Blocked User Agents'}
                  items={env.uasBlocked || []}
                  addItem={(ua: string) => {
                    addBlockedUaMutation({ appEnvId: env.id, ua }).then(() =>
                      toast({
                        status: 'success',
                        title: `Added Blocked User Agent ${ua}`,
                      }),
                    )
                  }}
                  removeItem={(ua: string) => {
                    removeBlockedUaMutation({ appEnvId: env.id, ua }).then(() =>
                      toast({
                        status: 'success',
                        title: `Removed Blocked User Agent ${ua}`,
                      }),
                    )
                  }}
                />
              </SimpleGrid>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </WebUiCard>
    </Stack>
  )
}
