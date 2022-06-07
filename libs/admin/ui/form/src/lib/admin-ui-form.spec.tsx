import { render } from '@testing-library/react'

import { AdminUiForm } from './admin-ui-form'

describe('AdminUiForm', () => {
  it('should render successfully', () => {
    const onSubmit = () => console.log('submit')
    const { baseElement } = render(<AdminUiForm fields={[]} data={{}} onSubmit={onSubmit} />)
    expect(baseElement).toBeTruthy()
  })
})
