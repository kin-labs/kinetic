import { WebAdminUiWalletTable } from '@kin-kinetic/web/admin/ui'
import { WebUiCard } from '@kin-kinetic/web/ui/card'
import { WebUiLoader } from '@kin-kinetic/web/ui/loader'
import { WebUiPage } from '@kin-kinetic/web/ui/page'
import { useAdminWalletsQuery } from '@kin-kinetic/web/util/admin-sdk'

export function WebAdminFeatureWalletList() {
  const [{ data, fetching }] = useAdminWalletsQuery()

  return (
    <WebUiPage title={'Wallets'}>
      <WebUiCard p={'0'}>
        {fetching ? <WebUiLoader /> : <WebAdminUiWalletTable wallets={data?.items || []} />}
      </WebUiCard>
    </WebUiPage>
  )
}
