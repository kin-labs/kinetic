import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import { AdminAppUserFeature } from './admin-app-user-feature'

describe('AdminAppUserFeature', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <AdminAppUserFeature />
      </BrowserRouter>,
    )
    expect(baseElement).toBeTruthy()
  })
})
