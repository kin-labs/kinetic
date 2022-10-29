import { WebUiCard } from '@kin-kinetic/web/ui/card'
import { WebUiPage } from '@kin-kinetic/web/ui/page'
import { WebUiLoader } from './web-ui-loader'

export function WebUiLoaderPage({ title = 'Loading...' }: { title?: string }) {
  return (
    <WebUiPage title={title}>
      <WebUiCard>
        <WebUiLoader />
      </WebUiCard>
    </WebUiPage>
  )
}
