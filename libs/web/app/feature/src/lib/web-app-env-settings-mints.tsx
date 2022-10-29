import { useToast } from '@chakra-ui/react'
import { WebAppUiAppEnvMintSettings } from '@kin-kinetic/web/app/ui'
import { WebUiAlert } from '@kin-kinetic/web/ui/alert'
import { WebUiLoader } from '@kin-kinetic/web/ui/loader'
import {
  App,
  AppEnv,
  UserAppMintUpdateInput,
  useUserAppEnvMintDisableMutation,
  useUserAppEnvMintEnableMutation,
  useUserAppEnvMintSetWalletMutation,
  useUserAppEnvQuery,
  useUserUpdateAppMintMutation,
} from '@kin-kinetic/web/util/admin-sdk'

export function WebAppEnvSettingsMints({ app, env }: { app: App; env: AppEnv }) {
  const toast = useToast()
  const [{ data, fetching }] = useUserAppEnvQuery({
    variables: { appId: app.id, appEnvId: env.id },
  })
  const [, updateAppMintMutation] = useUserUpdateAppMintMutation()
  const [, disableMintMutation] = useUserAppEnvMintDisableMutation()
  const [, enableMintMutation] = useUserAppEnvMintEnableMutation()
  const [, setWalletMutation] = useUserAppEnvMintSetWalletMutation()

  const disableMint = (mintId: string) => {
    disableMintMutation({
      appId: app.id,
      appEnvId: env.id,
      mintId,
    }).then(() => toast({ status: 'success', title: 'Mint disabled' }))
  }

  const updateAppMint = (appMintId: string, input: UserAppMintUpdateInput) => {
    updateAppMintMutation({ appId: app.id, appMintId, input }).then(() =>
      toast({
        status: 'success',
        title: 'Mint updated',
      }),
    )
  }
  const enableMint = (mintId: string) => {
    enableMintMutation({
      appId: app.id,
      appEnvId: env.id,
      mintId,
    }).then(() => toast({ status: 'success', title: 'Mint enabled' }))
  }
  const selectWallet = (mintId: string, walletId: string) => {
    setWalletMutation({
      appId: app.id,
      appEnvId: env.id,
      mintId,
      walletId,
    }).then(() => toast({ status: 'success', title: 'Fee Payer updated' }))
  }

  if (fetching) {
    return <WebUiLoader />
  }

  if (!data?.item) {
    return <WebUiAlert status="error" message="App not found" />
  }

  return (
    <WebAppUiAppEnvMintSettings
      appEnv={data.item}
      disableMint={disableMint}
      enableMint={enableMint}
      selectWallet={selectWallet}
      updateAppMint={updateAppMint}
    />
  )
}
