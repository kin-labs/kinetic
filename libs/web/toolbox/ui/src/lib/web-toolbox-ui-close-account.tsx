import { Box, useToast } from '@chakra-ui/react'
import { Keypair } from '@kin-kinetic/keypair'
import { KineticSdk, Transaction } from '@kin-kinetic/sdk'
import { Commitment } from '@kin-kinetic/solana'
import { ButtonGroup, Field, Form, SubmitButton } from '@saas-ui/react'
import { useState } from 'react'
import { WebToolboxUiCard } from './web-toolbox-ui-card'
import { WebToolboxUiSelectCommitment } from './web-toolbox-ui-select-commitment'

export function WebToolboxUiCloseAccount({
  finished,
  keypair,
  sdk,
}: {
  finished: () => void
  keypair: Keypair
  sdk: KineticSdk
}) {
  const toast = useToast()
  const [commitment, setCommitment] = useState<Commitment>(Commitment.Confirmed)
  const [error, setError] = useState<unknown | undefined>()
  const [loading, setLoading] = useState<boolean>(false)
  const [response, setResponse] = useState<Transaction | undefined>()

  function onSubmit({ account }: { account: string }) {
    setResponse(undefined)
    setError(undefined)
    setLoading(true)

    sdk
      .closeAccount({ account, reference: 'Toolbox|Close', commitment })
      .then((res) => {
        setResponse(res)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)

        console.log(err)
        toast({
          title: 'Error',
          description: err.toString(),
          status: 'error',
        })
      })
  }

  return (
    <WebToolboxUiCard
      response={response}
      error={error}
      finished={finished}
      sdk={sdk}
      signature={response?.signature ? response.signature : undefined}
      explorer={response?.signature ? sdk?.getExplorerUrl(`tx/${response?.signature}`) : undefined}
    >
      <Form defaultValues={{ account: keypair.publicKey }} onSubmit={onSubmit}>
        <ButtonGroup alignItems="center">
          <Box>
            <SubmitButton isLoading={loading} type="submit" size="lg">
              Close Account
            </SubmitButton>
          </Box>
          <WebToolboxUiSelectCommitment commitment={commitment} setCommitment={setCommitment} />
          <Box>
            <Field size="lg" name="account" placeholder="Account" type="text" rules={{ required: true }} />
          </Box>
        </ButtonGroup>
      </Form>
    </WebToolboxUiCard>
  )
}
