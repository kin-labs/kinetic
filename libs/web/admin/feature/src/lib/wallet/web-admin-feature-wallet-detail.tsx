import { Box, Tag, TagLabel } from '@chakra-ui/react'
import { WebUiAlert } from '@kin-kinetic/web/ui/alert'
import { WebUiCard } from '@kin-kinetic/web/ui/card'
import { WebUiLoaderPage } from '@kin-kinetic/web/ui/loader'
import { WebUiPage, WebUiPageBackButton } from '@kin-kinetic/web/ui/page'
import { AppEnv, useAdminWalletQuery } from '@kin-kinetic/web/util/admin-sdk'
import { useParams } from 'react-router-dom'

export function WebAdminFeatureWalletDetail() {
  const { walletId } = useParams<{ walletId: string }>()
  const [{ data, fetching }] = useAdminWalletQuery({
    variables: { walletId: walletId || '' },
  })

  if (fetching) {
    return <WebUiLoaderPage />
  }

  if (!data?.item) {
    return <WebUiAlert status="error" message="Wallet not found :(" />
  }

  return (
    <WebUiPage title={data.item.publicKey || ''} actionLeft={<WebUiPageBackButton />}>
      <WebUiCard>
        <Box>
          {data.item?.appEnvs?.map((item: AppEnv) => (
            <Tag key={item?.key} size="sm" variant="subtle" colorScheme="primary">
              <TagLabel>{item.key}</TagLabel>
            </Tag>
          ))}
        </Box>
      </WebUiCard>
      <WebUiCard>TBD</WebUiCard>
    </WebUiPage>
  )
}
