import { render } from '@testing-library/react'

import { WebUiCopy } from './web-ui-copy'

describe('WebUiCopy', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WebUiCopy />)
    expect(baseElement).toBeTruthy()
  })
})
