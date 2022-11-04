import { WebAuthProvider } from '@kin-kinetic/web/auth/data-access'
import { WebConfigProvider } from '@kin-kinetic/web/shell/data-access'
import { WebUiLayout } from '@kin-kinetic/web/ui/layout'
import { WebUiLoader } from '@kin-kinetic/web/ui/loader'
import { GraphQLProvider } from '@kin-kinetic/web/util/sdk'
import { Suspense } from 'react'
import { WebShellFeatureRoutes } from './web-shell-feature-routes'

export function WebShellFeature({ endpoint }: { endpoint: string }) {
  return (
    <Suspense fallback={<WebUiLoader />}>
      <GraphQLProvider endpoint={endpoint}>
        <WebConfigProvider>
          <WebAuthProvider>
            <WebUiLayout>
              <WebShellFeatureRoutes />
            </WebUiLayout>
          </WebAuthProvider>
        </WebConfigProvider>
      </GraphQLProvider>
    </Suspense>
  )
}
