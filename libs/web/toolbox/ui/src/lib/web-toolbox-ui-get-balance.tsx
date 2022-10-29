import { Keypair } from '@kin-kinetic/keypair'
import { BalanceResponse, KineticSdk, removeDecimals } from '@kin-kinetic/sdk'
import { Button, ButtonGroup } from '@saas-ui/react'
import { useEffect, useState } from 'react'
import { WebToolboxUiBalanceAmount } from './web-toolbox-ui-balance-amount'
import { WebToolboxUiCard } from './web-toolbox-ui-card'

export function WebToolboxUiGetBalance({ keypair, sdk }: { keypair: Keypair; sdk: KineticSdk }) {
  const [error, setError] = useState<unknown | undefined>()
  const [loading, setLoading] = useState<boolean>(false)
  const [response, setResponse] = useState<BalanceResponse | undefined>()

  function getBalance() {
    setResponse(undefined)
    setError(undefined)
    setLoading(true)

    sdk
      .getBalance({ account: keypair.publicKey })
      .then((res) => {
        setResponse(res)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }

  useEffect(() => {
    if (response) return
    getBalance()
  }, [])

  return (
    <WebToolboxUiCard response={response} error={error} explorer={sdk?.getExplorerUrl(`address/${keypair?.publicKey}`)}>
      <ButtonGroup>
        <Button variant="primary" isLoading={loading} size="lg" onClick={getBalance}>
          Get Balance
        </Button>
        <Button size="lg" disabled={true}>
          <WebToolboxUiBalanceAmount amount={response?.balance ?? '0'} symbol={sdk?.config?.mint.symbol ?? 'KIN'} />
        </Button>
      </ButtonGroup>
    </WebToolboxUiCard>
  )
}
