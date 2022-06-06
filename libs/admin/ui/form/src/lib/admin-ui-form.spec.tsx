import { render } from '@testing-library/react'

import { AdminUiForm } from './admin-ui-form'

describe('AdminUiForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <AdminUiForm fields={[]} onValidate={() => ({})} onSubmit={() => console.log('submit')} />,
    )
    expect(baseElement).toBeTruthy()
  })
})
