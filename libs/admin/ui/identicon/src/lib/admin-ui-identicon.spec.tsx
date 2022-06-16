import { render } from '@testing-library/react'

import { AdminUiIdenticon } from './admin-ui-identicon'

describe('WebUiIdenticon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AdminUiIdenticon name="test" />)
    expect(baseElement).toBeTruthy()
  })
})
