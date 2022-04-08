import { render } from '@testing-library/react'

import { AdminUserUiForm } from './admin-user-ui-form'

describe('AdminUserUiForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <AdminUserUiForm
        onSubmit={async () => {
          console.log('hi')
        }}
      />,
    )
    expect(baseElement).toBeTruthy()
  })
})
