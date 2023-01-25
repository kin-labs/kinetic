import { Box, useToast } from '@chakra-ui/react'
import { Keypair } from '@kin-kinetic/keypair'
import { AppConfigMint, KineticSdk, Transaction } from '@kin-kinetic/sdk'
import { Commitment } from '@kin-kinetic/solana'
import { Button, ButtonGroup, Field, Form, SubmitButton } from '@saas-ui/react'
import { useState } from 'react'
import { WebToolboxUiCard } from './web-toolbox-ui-card'
import { WebToolboxUiSelectCommitment } from './web-toolbox-ui-select-commitment'

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
  const [commitment, setCommitment] = useState<Commitment>(Commitment.Confirmed)
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
        commitment,
        destination,
        mint: selectedMint?.publicKey,
        owner: keypair,
        reference: 'Toolbox|Transfer',
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
      <Form
        defaultValues={{ amount: '42', destination: 'BobQoPqWy5cpFioy1dMTYqNH9WpC39mkAEDJWXECoJ9y' }}
        onSubmit={onSubmit}
      >
        <ButtonGroup>
          <Box>
            <SubmitButton isLoading={loading} type="submit" size="lg" disableIfInvalid>
              Make Transfer
            </SubmitButton>
          </Box>
          <WebToolboxUiSelectCommitment commitment={commitment} setCommitment={setCommitment} />
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
