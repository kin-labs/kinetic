import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import { AdminShellFeature } from './admin-shell-feature'

describe('AdminShellFeature', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <AdminShellFeature />
      </BrowserRouter>,
    )
    expect(baseElement).toBeTruthy()
  })
})
