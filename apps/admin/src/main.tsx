import { AdminUiLoader } from '@mogami/admin/ui/loader'
import { StrictMode, Suspense } from 'react'
import * as ReactDOM from 'react-dom'

import { App } from './app/app'

ReactDOM.render(
  <StrictMode>
    <Suspense fallback={<AdminUiLoader />}>
      <App />
    </Suspense>
  </StrictMode>,
  document.getElementById('root'),
)
