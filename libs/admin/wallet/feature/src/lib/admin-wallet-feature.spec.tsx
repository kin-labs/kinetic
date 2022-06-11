import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import { AdminWalletFeature } from './admin-wallet-feature'

describe('AdminWalletFeature', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <AdminWalletFeature />
      </BrowserRouter>,
    )
    expect(baseElement).toBeTruthy()
  })
})
