import { useToast } from '@chakra-ui/react'
import { Keypair } from '@kin-kinetic/keypair'
import { BalanceResponse, KineticSdk } from '@kin-kinetic/sdk'
import { Commitment } from '@kin-kinetic/solana'
import { Button, ButtonGroup } from '@saas-ui/react'
import { useEffect, useState } from 'react'
import { WebToolboxUiBalanceAmount } from './web-toolbox-ui-balance-amount'
import { WebToolboxUiCard } from './web-toolbox-ui-card'
import { WebToolboxUiSelectCommitment } from './web-toolbox-ui-select-commitment'

export function WebToolboxUiGetBalance({ keypair, sdk }: { keypair: Keypair; sdk: KineticSdk }) {
  const toast = useToast()
  const [commitment, setCommitment] = useState<Commitment>(Commitment.Confirmed)
  const [error, setError] = useState<unknown | undefined>()
  const [loading, setLoading] = useState<boolean>(false)
  const [response, setResponse] = useState<BalanceResponse | undefined>()

  function getBalance() {
    setResponse(undefined)
    setError(undefined)
    setLoading(true)

    sdk
      .getBalance({ account: keypair.publicKey, commitment })
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

  useEffect(() => {
    if (response) return
    getBalance()
  }, [])

  useEffect(() => {
    console.log(`getBalance: Public key updated ${keypair.publicKey}`)
    getBalance()
  }, [keypair.publicKey])

  return (
    <WebToolboxUiCard response={response} error={error} explorer={sdk?.getExplorerUrl(`address/${keypair?.publicKey}`)}>
      <ButtonGroup>
        <Button variant="primary" isLoading={loading} size="lg" onClick={getBalance}>
          Get Balance
        </Button>
        <WebToolboxUiSelectCommitment commitment={commitment} setCommitment={setCommitment} />
        <Button size="lg" disabled={true}>
          <WebToolboxUiBalanceAmount amount={response?.balance ?? '0'} symbol={sdk?.config?.mint.symbol ?? 'KIN'} />
        </Button>
      </ButtonGroup>
    </WebToolboxUiCard>
  )
}
