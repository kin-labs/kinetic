import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Heading,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react'
import { WebUiCard } from '@kin-kinetic/web/ui/card'
import { WebUiPageHeader } from '@kin-kinetic/web/ui/page'
import { App, AppEnv, useUserUpdateAppEnvMutation } from '@kin-kinetic/web/util/sdk'
import { yupResolver } from '@saas-ui/forms/yup'
import { Field, Form, FormLayout, Link, SubmitButton, SwitchField } from '@saas-ui/react'
import * as Yup from 'yup'

export function WebAppEnvSettingsSolana({ app, env }: { app: App; env: AppEnv }) {
  const toast = useToast()
  const [, updateAppEnv] = useUserUpdateAppEnvMutation()

  const submit = async ({
    solanaTransactionMaxRetries = 0,
    solanaTransactionSkipPreflight = false,
  }: AppEnvSolanaTransactionInput) => {
    await updateAppEnv({
      appId: app.id,
      appEnvId: env.id,
      input: {
        solanaTransactionMaxRetries,
        solanaTransactionSkipPreflight,
      },
    })
      .then((res) => {
        if (res.error) {
          toast({
            title: 'Error',
            description: res.error.message,
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
        } else {
          toast({
            title: 'Success',
            description: 'Settings updated',
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
        }
      })
      .catch((err) => {
        toast({
          title: 'Error',
          description: err.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      })
  }

  return (
    <Stack spacing={{ base: 2, md: 6 }}>
      <Flex justify="space-between" align="start">
        <Box>
          <WebUiPageHeader title="Solana" />
          <Text ml={2} mt={2} color="gray.500">
            Here are some configuration options for Solana in this environment.
          </Text>
        </Box>
      </Flex>
      <WebUiCard px={2}>
        <Accordion defaultIndex={[0]} allowMultiple>
          <AccordionItem>
            <AccordionButton alignItems="center">
              <Flex flex="1" alignItems="center">
                <Heading ml={2} size="md" mt={1}>
                  Transactions
                </Heading>
              </Flex>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Stack spacing={4}>
                <WebAppEnvSolanaTransactionForm env={env} onSubmit={submit} />
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </WebUiCard>
    </Stack>
  )
}

export interface AppEnvSolanaTransactionInput {
  solanaTransactionMaxRetries?: number
  solanaTransactionSkipPreflight?: boolean
}

export function WebAppEnvSolanaTransactionForm({
  env,
  onSubmit,
}: {
  env: AppEnv
  onSubmit: (input: AppEnvSolanaTransactionInput) => Promise<unknown>
}) {
  const schema = Yup.object().shape({
    solanaTransactionMaxRetries: Yup.number().label('Event webhook url').required(),
    solanaTransactionSkipPreflight: Yup.boolean().label('Event webhook enabled'),
  })

  return (
    <Form
      defaultValues={{ ...env }}
      resolver={yupResolver(schema, { stripUnknown: true })}
      onSubmit={(res) => onSubmit(res as AppEnvSolanaTransactionInput)}
    >
      <FormLayout>
        <Stack spacing={{ base: 2, md: 6 }}>
          <Heading size="md">Send Options</Heading>
          <Text ml={2} mt={2} color="gray.500">
            Configure how the Solana transactions are being sent. More info can be found{' '}
            <Link
              target="_blank"
              color="primary.500"
              href="https://docs.solana.com/integrations/retrying-transactions#the-cost-of-skipping-preflight"
            >
              here
            </Link>
            .
          </Text>
          <Field
            isDisabled={!env.solanaTransactionMaxRetries}
            name="solanaTransactionMaxRetries"
            label="Max Retries"
            type="number"
            help="Maximum number of times for the RPC node to retry sending the transaction to the leader."
            rules={{ required: true }}
          />
          <SwitchField
            defaultChecked={env.solanaTransactionSkipPreflight ?? false}
            name="solanaTransactionSkipPreflight"
            label="Skip Preflight"
            help="Disable the transaction verification step."
          />
          <Box>
            <SubmitButton>Save</SubmitButton>
          </Box>
        </Stack>
      </FormLayout>
    </Form>
  )
}
