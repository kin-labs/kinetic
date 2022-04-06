import { render } from '@testing-library/react'

import AdminAppFeature from './admin-app-feature'

describe('AdminAppFeature', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AdminAppFeature />)
    expect(baseElement).toBeTruthy()
  })
})
