import { render } from '@testing-library/react'
import { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { DemoShellFeature } from './demo-shell-feature'

describe('DemoShellFeature', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <Suspense fallback="Loading...">
          <DemoShellFeature />
        </Suspense>
      </BrowserRouter>,
    )
    expect(baseElement).toBeTruthy()
  })
})
