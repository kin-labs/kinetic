import { Box, useToast } from '@chakra-ui/react'
import { Keypair } from '@kin-kinetic/keypair'
import { AppConfigMint, KineticSdk, Transaction } from '@kin-kinetic/sdk'
import { Button, ButtonGroup, Field, Form, SubmitButton } from '@saas-ui/react'
import { useState } from 'react'
import { WebToolboxUiCard } from './web-toolbox-ui-card'

export function WebToolboxUiMakeTransfer({
  keypair,
  sdk,
  selectedMint,
}: {
  keypair: Keypair
  sdk: KineticSdk
  selectedMint: AppConfigMint | undefined
}) {
  const toast = useToast()
  const [error, setError] = useState<unknown | undefined>()
  const [loading, setLoading] = useState<boolean>(false)
  const [response, setResponse] = useState<Transaction | undefined>()

  const onSubmit = ({ amount, destination }: { amount: string; destination: string }) => {
    setResponse(undefined)
    setError(undefined)
    setLoading(true)

    sdk
      .makeTransfer({
        amount,
        destination,
        mint: selectedMint?.publicKey,
        owner: keypair,
        referenceType: 'Toolbox Transfer',
      })
      .then((res) => {
        setResponse(res)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
        toast({
          title: 'Error',
          description: err.message,
          status: 'error',
        })
      })
  }

  return (
    <WebToolboxUiCard
      response={response}
      error={error}
      explorer={response?.signature ? sdk?.getExplorerUrl(`tx/${response?.signature}`) : undefined}
      sdk={sdk}
      signature={response?.signature ? response?.signature : undefined}
    >
      <Form defaultValues={{ amount: '1000', destination: '' }} onSubmit={onSubmit}>
        <ButtonGroup>
          <Box>
            <SubmitButton isLoading={loading} type="submit" size="lg" disableIfUntouched>
              Make Transfer
            </SubmitButton>
          </Box>
          <Box>
            <Field size="lg" name="amount" width={70} placeholder="Amount" type="text" rules={{ required: true }} />
          </Box>
          <Field
            size="lg"
            name="destination"
            placeholder="Destination Address"
            type="text"
            rules={{ required: true }}
          />
          {response?.status && (
            <Box>
              <Button size="lg" disabled={true}>
                {response?.status}
              </Button>
            </Box>
          )}
        </ButtonGroup>
      </Form>
    </WebToolboxUiCard>
  )
}
