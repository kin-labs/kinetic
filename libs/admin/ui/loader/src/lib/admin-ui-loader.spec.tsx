import { render } from '@testing-library/react'

import { AdminUiLoader } from './admin-ui-loader'

describe('AdminUiLoader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AdminUiLoader />)
    expect(baseElement).toBeTruthy()
  })
})
