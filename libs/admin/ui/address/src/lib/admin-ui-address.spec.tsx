import { render } from '@testing-library/react'

import { AdminUiAddress } from './admin-ui-address'

describe('AdminUiAddress', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AdminUiAddress address={'abc'} />)
    expect(baseElement).toBeTruthy()
  })
})
