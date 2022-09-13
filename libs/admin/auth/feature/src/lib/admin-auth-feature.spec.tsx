import { AdminAuthProvider } from '@kin-kinetic/admin/auth/data-access'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import { AdminAuthFeature } from './admin-auth-feature'

describe('AdminAuthFeature', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <AdminAuthProvider>
          <AdminAuthFeature />
        </AdminAuthProvider>
      </BrowserRouter>,
    )
    expect(baseElement).toBeTruthy()
  })
})
