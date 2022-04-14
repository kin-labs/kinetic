import { render } from '@testing-library/react'
import { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { DemoHomeFeature } from './demo-home-feature'

describe('DemoHomeFeature', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <Suspense fallback="Loading...">
          <DemoHomeFeature />
        </Suspense>
      </BrowserRouter>,
    )
    expect(baseElement).toBeTruthy()
  })
})
