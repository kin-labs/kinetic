import { Keypair } from '@kin-kinetic/keypair'
import { KineticSdk } from '@kin-kinetic/sdk'
import { useWebKeypair } from '@kin-kinetic/web/keypair/data-access'
import { WebToolboxUi } from '@kin-kinetic/web/toolbox/ui'
import { WebUiAlert } from '@kin-kinetic/web/ui/alert'
import { WebUiContainer } from '@kin-kinetic/web/ui/container'
import { WebUiLoader } from '@kin-kinetic/web/ui/loader'
import { App, AppEnv } from '@kin-kinetic/web/util/admin-sdk'
import { useEffect, useState } from 'react'

export function WebAppEnvToolbox({ app, env }: { app: App; env: AppEnv }) {
  const { keypairs, selected, selectKeypair } = useWebKeypair()
  const [sdk, setSdk] = useState<KineticSdk | undefined>()

  useEffect(() => {
    KineticSdk.setup({
      endpoint: `${env.endpoint}`,
      environment: `${env.name}`,
      index: app.index,
      logger: console,
    }).then(setSdk)
  }, [])

  if (!sdk) {
    return <WebUiLoader />
  }

  if (!selected || !selected.mnemonic) {
    if (!keypairs?.length) {
      return <WebUiAlert status="warning" message="There are no keypairs" />
    }
    selectKeypair(keypairs[0].id ?? 0)
    return <WebUiAlert status="warning" message="Selecting first keypair" />
  }

  const keypair = Keypair.fromMnemonic(selected.mnemonic)

  return (
    <WebUiContainer>
      <WebToolboxUi keypair={keypair} sdk={sdk} />
    </WebUiContainer>
  )
}
