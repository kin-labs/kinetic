import { AdminAuthProvider } from '@mogami/admin/auth/data-access'
import { render } from '@testing-library/react'

import AdminAuthFeature from './admin-auth-feature'

describe('AdminAuthFeature', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <AdminAuthProvider>
        <AdminAuthFeature />
      </AdminAuthProvider>,
    )
    expect(baseElement).toBeTruthy()
  })
})
