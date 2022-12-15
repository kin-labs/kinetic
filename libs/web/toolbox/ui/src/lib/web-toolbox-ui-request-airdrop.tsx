import { Box, useToast } from '@chakra-ui/react'
import { Keypair } from '@kin-kinetic/keypair'
import { AppConfigMint, KineticSdk, RequestAirdropResponse } from '@kin-kinetic/sdk'
import { Commitment } from '@kin-kinetic/solana'

import { ButtonGroup, Field, Form, SubmitButton } from '@saas-ui/react'
import { useState } from 'react'
import { WebToolboxUiCard } from './web-toolbox-ui-card'
import { WebToolboxUiSelectCommitment } from './web-toolbox-ui-select-commitment'

export function WebToolboxUiRequestAirdrop({
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
  const [response, setResponse] = useState<RequestAirdropResponse | undefined>()

  const onSubmit = ({ amount }: { amount: string }) => {
    setResponse(undefined)
    setError(undefined)
    setLoading(true)

    sdk
      .requestAirdrop({
        account: keypair.publicKey,
        amount: amount,
        commitment,
        mint: selectedMint?.publicKey,
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
      explorer={response?.signature && sdk?.getExplorerUrl(`tx/${response?.signature}`)}
      sdk={sdk}
      signature={response?.signature}
    >
      <Form
        defaultValues={{
          amount: (selectedMint?.airdropMax || '0').toString(),
        }}
        onSubmit={onSubmit}
      >
        <ButtonGroup>
          <Box>
            <SubmitButton isLoading={loading} size="lg">
              Request Airdrop
            </SubmitButton>
          </Box>
          <WebToolboxUiSelectCommitment commitment={commitment} setCommitment={setCommitment} />
          <Box>
            <Field
              size="lg"
              name="amount"
              width={79}
              placeholder="Airdrop Amount"
              type="text"
              rules={{ required: true }}
            />
          </Box>
        </ButtonGroup>
      </Form>
    </WebToolboxUiCard>
  )
}
