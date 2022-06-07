import { render } from '@testing-library/react'

import { AdminAppUiForm } from './admin-app-ui-form'

describe('AdminAppUiForm', () => {
  it('should render successfully', () => {
    const onSubmit = async () => console.log('submit')
    const { baseElement } = render(<AdminAppUiForm onSubmit={onSubmit} />)
    expect(baseElement).toBeTruthy()
  })
})
