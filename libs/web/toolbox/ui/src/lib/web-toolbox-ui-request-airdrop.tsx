import { Box } from '@chakra-ui/react'
import { Keypair } from '@kin-kinetic/keypair'
import { AppConfigMint, KineticSdk, RequestAirdropResponse } from '@kin-kinetic/sdk'

import { ButtonGroup, Field, Form, SubmitButton } from '@saas-ui/react'
import { useState } from 'react'
import { WebToolboxUiCard } from './web-toolbox-ui-card'

export function WebToolboxUiRequestAirdrop({
  keypair,
  sdk,
  selectedMint,
}: {
  keypair: Keypair
  sdk: KineticSdk
  selectedMint: AppConfigMint | undefined
}) {
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
        mint: selectedMint?.publicKey,
      })
      .then((res) => {
        setResponse(res)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }

  return (
    <WebToolboxUiCard
      response={response}
      error={error}
      explorer={response?.signature && sdk?.getExplorerUrl(`tx/${response?.signature}`)}
    >
      <Form
        defaultValues={{
          amount: (selectedMint?.airdropAmount || '0').toString(),
        }}
        onSubmit={onSubmit}
      >
        <ButtonGroup>
          <Box>
            <SubmitButton isLoading={loading} size="lg">
              Request Airdrop
            </SubmitButton>
          </Box>
          <Box>
            <Field
              size="lg"
              name="amount"
              width={70}
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
