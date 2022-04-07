import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import AdminHomeFeature from './admin-home-feature'

describe('AdminHomeFeature', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <AdminHomeFeature />
      </BrowserRouter>,
    )
    expect(baseElement).toBeTruthy()
  })
})
