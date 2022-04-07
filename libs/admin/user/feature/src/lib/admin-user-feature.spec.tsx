import { render } from '@testing-library/react'

import { AdminUserFeature } from './admin-user-feature'

describe('AdminUserFeature', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AdminUserFeature />)
    expect(baseElement).toBeTruthy()
  })
})
