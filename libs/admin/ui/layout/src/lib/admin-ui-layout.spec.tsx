import { AdminAuthProvider } from '@kin-kinetic/admin/auth/data-access'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import { AdminUiLayout } from './admin-ui-layout'

describe('AdminUiLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <AdminAuthProvider>
          <AdminUiLayout copyright={'Hi'} name={'Name'} links={[]} />
        </AdminAuthProvider>
      </BrowserRouter>,
    )
    expect(baseElement).toBeTruthy()
  })
})
