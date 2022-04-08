import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import { AdminUserFeature } from './admin-user-feature'

describe('AdminUserFeature', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <AdminUserFeature />
      </BrowserRouter>,
    )
    expect(baseElement).toBeTruthy()
  })
})
