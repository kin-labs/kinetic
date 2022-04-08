import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import { AdminAppFeature } from './admin-app-feature'

describe('AdminAppFeature', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <AdminAppFeature />
      </BrowserRouter>,
    )
    expect(baseElement).toBeTruthy()
  })
})
