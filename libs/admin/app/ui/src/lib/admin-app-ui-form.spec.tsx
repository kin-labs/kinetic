import { render } from '@testing-library/react'

import { AdminAppUiForm } from './admin-app-ui-form'

describe('AdminAppUiForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AdminAppUiForm />)
    expect(baseElement).toBeTruthy()
  })
})
