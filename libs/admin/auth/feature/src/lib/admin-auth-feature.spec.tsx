import { render } from '@testing-library/react'

import AdminAuthFeature from './admin-auth-feature'

describe('AdminAuthFeature', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AdminAuthFeature />)
    expect(baseElement).toBeTruthy()
  })
})
