import { render } from '@testing-library/react'

import { WebUiIdenticon } from './web-ui-identicon'

describe('WebUiIdenticon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WebUiIdenticon name="test" />)
    expect(baseElement).toBeTruthy()
  })
})
