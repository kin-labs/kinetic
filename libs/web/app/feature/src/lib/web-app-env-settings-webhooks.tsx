import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  AlertIcon,
  Box,
  Flex,
  Heading,
  Stack,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  useToast,
} from '@chakra-ui/react'
import {
  WebWebhookUiBalanceForm,
  WebWebhookUiDebuggingForm,
  WebWebhookUiEventForm,
  WebWebhookUiVerifyForm,
} from '@kin-kinetic/web/app/ui'
import { WebUiAlert } from '@kin-kinetic/web/ui/alert'
import { WebUiCard } from '@kin-kinetic/web/ui/card'
import { WebUiPageHeader } from '@kin-kinetic/web/ui/page'
import { App, AppEnv, UserAppEnvUpdateInput, useUserUpdateAppEnvMutation } from '@kin-kinetic/web/util/sdk'
import { ReactNode } from 'react'
import { GoPrimitiveDot } from 'react-icons/go'

export function WebAppEnvSettingsWebhooks({ app, env }: { app: App; env: AppEnv }) {
  const toast = useToast()
  const [, updateAppEnvMutation] = useUserUpdateAppEnvMutation()

  const toastError = (error: string) =>
    toast({
      title: 'Error updating webhooks',
      status: 'error',
      description: `${error}`,
    })

  const onSubmit = (input: UserAppEnvUpdateInput) => {
    return updateAppEnvMutation({
      appId: app.id,
      appEnvId: env.id,
      input,
    })
      .then((res) => {
        if (res.error) {
          return toastError(`${res.error}`)
        }
        return toast({ title: 'Webhooks updated', status: 'success' })
      })
      .catch((error) => toastError(`${error}`))
  }
  return (
    <Stack spacing={{ base: 2, md: 6 }}>
      <Flex justify="space-between" align="start">
        <Box>
          <WebUiPageHeader title="Webhooks" />
          <Text ml={2} mt={2} color="gray.500">
            Webhooks allow Kinetic to send information to your server when certain events happen. When the specified
            events happen, your app will send a POST request to the URLs you provide below.
          </Text>
        </Box>
        <Box mt={2}>
          <WebWebhookUiDebuggingForm env={env} onSubmit={onSubmit} />
        </Box>
      </Flex>
      {env.webhookDebugging ? (
        <WebUiAlert status="warning">
          <AlertIcon />
          Debugging enabled, webhooks will not be sent to your server. Inspect the transactions to see the webhook
          payloads.
        </WebUiAlert>
      ) : null}
      <WebUiCard px={2}>
        <Accordion
          defaultIndex={[
            env?.webhookBalanceEnabled ? 0 : -1,
            env.webhookEventEnabled ? 1 : -1,
            env.webhookVerifyEnabled ? 2 : -1,
          ]}
          allowMultiple
        >
          <AccordionItem>
            <AccordionButton alignItems="center">
              <WebhookLabel title="Balance webhook" enabled={!!env.webhookBalanceEnabled} />
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Stack spacing={4}>
                <WebUiAlert status="info">
                  <AlertIcon />
                  Enabling the balance webhook will start polling the balance of the fee payer wallets each minute.
                </WebUiAlert>
                <WebWebhookUiBalanceForm env={env} onSubmit={onSubmit} />
              </Stack>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionButton alignItems="center">
              <WebhookLabel title="Event webhook" enabled={!!env.webhookEventEnabled} />
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <WebWebhookUiEventForm env={env} onSubmit={onSubmit} />
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionButton alignItems="center">
              <WebhookLabel title="Verify webhook" enabled={!!env.webhookVerifyEnabled} />
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <WebWebhookUiVerifyForm env={env} onSubmit={onSubmit} />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </WebUiCard>
    </Stack>
  )
}

export function WebhookLabel({ enabled, title }: { enabled: boolean; title: ReactNode }) {
  return (
    <Flex flex="1" alignItems="center">
      <Tag size={'sm'} variant="subtle" colorScheme="primary">
        <TagLeftIcon boxSize="12px" as={GoPrimitiveDot} color={enabled ? 'green.500' : 'gray.500'} />
        <TagLabel>{enabled ? 'Enabled' : 'Disabled'}</TagLabel>
      </Tag>
      <Heading ml={2} size="md" mt={1}>
        {title}
      </Heading>
    </Flex>
  )
}
