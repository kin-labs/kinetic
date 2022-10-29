import { Stack, Text, useColorModeValue } from '@chakra-ui/react'
import { AppEnv } from '@kin-kinetic/web/util/sdk'
import { Divider, Property, PropertyList } from '@saas-ui/react'

export function WebAdminUiAppEnvSummary({ appEnv }: { appEnv: AppEnv }) {
  return (
    <Stack>
      <WebUiPropertyList
        title={'Cluster Info'}
        items={[
          { label: 'Cluster Type', value: `${appEnv.cluster?.type}` },
          { label: 'Cluster Name', value: `${appEnv.cluster?.name}` },
          {
            label: 'Private Endpoint',
            value: `${appEnv.cluster?.endpointPrivate}`,
          },
          {
            label: 'Public Endpoint',
            value: `${appEnv.cluster?.endpointPublic}`,
          },
          { label: 'Explorer URL', value: `${appEnv.cluster?.explorer}` },
        ]}
      />
      <Divider />

      <WebUiPropertyList
        title={'Access Control'}
        items={[
          {
            label: 'IPs Allowed',
            value: `${appEnv.ipsAllowed?.length ?? 'None'}`,
          },

          {
            label: 'IPs Blocked',
            value: `${appEnv.ipsBlocked?.length ?? 'None'}`,
          },

          {
            label: 'User Agents Allowed',
            value: `${appEnv.uasAllowed?.length ?? 'None'}`,
          },

          {
            label: 'User Agents Blocked',
            value: `${appEnv.uasBlocked?.length ?? 'None'}`,
          },
        ]}
      />

      <WebUiPropertyList
        title={'Webhooks'}
        items={[
          {
            label: 'Webhook Debugging',
            value: `${appEnv.webhookDebugging ? 'Enabled' : 'Disabled'}`,
          },
          {
            label: 'Webhook Event',
            value: `${appEnv.webhookEventEnabled ? 'Enabled' : 'Disabled'}`,
          },
          {
            label: 'Webhook Event Url',
            value: `${appEnv.webhookEventUrl || 'None'}`,
          },
          {
            label: 'Webhook Verify',
            value: `${appEnv.webhookVerifyEnabled ? 'Enabled' : 'Disabled'}`,
          },
          {
            label: 'Webhook Verify Url',
            value: `${appEnv.webhookVerifyUrl || 'None'}`,
          },
        ]}
      />
    </Stack>
  )
}

export function WebUiPropertyList({ items, title }: { items: { label: string; value: string }[]; title: string }) {
  return (
    <PropertyList>
      <WebUiPropertyHeader label={title} />
      {items.map((item, i) => (
        <Property key={`i_${i}`} label={item.label} value={item.value || ''} />
      ))}
    </PropertyList>
  )
}

export function WebUiPropertyHeader({ label }: { label: string }) {
  const headerColor = useColorModeValue('gray.600', 'gray.300')
  return (
    <Property
      label={
        <Text fontSize="xl" fontWeight="bold" color={headerColor} mt={1}>
          {label}
        </Text>
      }
    />
  )
}
