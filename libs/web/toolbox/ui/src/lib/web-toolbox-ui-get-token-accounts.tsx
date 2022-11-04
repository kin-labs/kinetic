import { Keypair } from '@kin-kinetic/keypair'
import { AppConfigMint, KineticSdk } from '@kin-kinetic/sdk'
import { Button, ButtonGroup } from '@saas-ui/react'
import { useState } from 'react'
import { WebToolboxUiCard } from './web-toolbox-ui-card'

export function WebToolboxUiGetTokenAccounts({
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
  const [response, setResponse] = useState<string[] | undefined>()

  const click = () => {
    setResponse(undefined)
    setError(undefined)
    setLoading(true)

    sdk
      .getTokenAccounts({
        account: keypair.publicKey,
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
    <WebToolboxUiCard response={response} error={error}>
      <ButtonGroup>
        <Button variant="primary" isLoading={loading} size="lg" onClick={click}>
          Get Token Accounts
        </Button>
        {response?.length && (
          <Button size="lg" disabled={true}>
            Token accounts for mint: {response?.length}
          </Button>
        )}
      </ButtonGroup>
    </WebToolboxUiCard>
  )
}
