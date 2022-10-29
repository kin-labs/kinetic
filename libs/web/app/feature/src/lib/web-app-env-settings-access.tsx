import { Heading, SimpleGrid, Stack, Text, useToast } from '@chakra-ui/react'
import { WebAppUiAppEnvAccessForm } from '@kin-kinetic/web/app/ui'
import { WebUiCard } from '@kin-kinetic/web/ui/card'
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
} from '@kin-kinetic/web/util/admin-sdk'

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

  return (
    <Stack>
      <Stack spacing={{ base: 2, md: 6 }}>
        <WebUiCard>
          <Heading size="md">Access Control</Heading>
        </WebUiCard>

        <WebUiCard>
          <Heading size="md">Allow or block IPs</Heading>
          <Text py={4} color="gray.500">
            Allows IPs will be allowed to access the app environment. Blocked IPs will be blocked from accessing the app
            environment.
          </Text>
          <Text pb={4} color="gray.500">
            The allowed IPs will be checked first. If the IP is a match, the user will be allowed to access the app
            environment. If the IP is not a match, the blocked IPs will be checked. If the IP is a match, the user will
            be blocked from accessing the app environment. If the IP is not a match, the user will be allowed to access
            the app environment.
          </Text>
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
        </WebUiCard>

        <WebUiCard>
          <Heading size="md">Allow or block user agents</Heading>
          <Text py={4} color="gray.500">
            Allowed user agents will be allowed to access the app environment. Blocked user agents will be blocked from
            accessing the app environment.
          </Text>
          <Text pb={4} color="gray.500">
            The allowed user agents will be checked first. If the user agent is a match, the user will be allowed to
            access the app environment. If the user agent is not a match, the blocked user agents will be checked. If
            the user agent is a match, the user will be blocked from accessing the app environment. If the user agent is
            not a match, the user will be allowed to access the app environment.
          </Text>
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
        </WebUiCard>
      </Stack>
    </Stack>
  )
}
