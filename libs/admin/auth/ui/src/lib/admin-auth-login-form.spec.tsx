import { render } from '@testing-library/react'

import { AdminAuthLoginForm } from './admin-auth-login-form'

describe('AdminAuthLoginForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AdminAuthLoginForm login={async () => true} />)
    expect(baseElement).toBeTruthy()
  })
})
