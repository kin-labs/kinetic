import { render } from '@testing-library/react'

import { AdminUiAlert } from './admin-ui-alert'

describe('AdminUiAlert', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AdminUiAlert message="test" />)
    expect(baseElement).toBeTruthy()
  })
})
