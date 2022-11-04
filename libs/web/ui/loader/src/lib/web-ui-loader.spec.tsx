import { render } from '@testing-library/react'

import { WebUiLoader } from './web-ui-loader'

describe('WebUiLoader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WebUiLoader />)
    expect(baseElement).toBeTruthy()
  })
})
