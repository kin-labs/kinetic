import { render } from '@testing-library/react'

import { WebUiAlert } from './web-ui-alert'

describe('WebUiAlert', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WebUiAlert />)
    expect(baseElement).toBeTruthy()
  })
})
