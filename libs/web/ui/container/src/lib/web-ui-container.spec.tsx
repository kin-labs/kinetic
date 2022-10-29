import { render } from '@testing-library/react'

import { WebUiContainer } from './web-ui-container'

describe('WebUiContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WebUiContainer>hi</WebUiContainer>)
    expect(baseElement).toBeTruthy()
  })
})
