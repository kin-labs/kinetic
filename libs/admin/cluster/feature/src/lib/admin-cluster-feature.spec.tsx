import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import { AdminClusterFeature } from './admin-cluster-feature'

describe('AdminClusterFeature', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <AdminClusterFeature />
      </BrowserRouter>,
    )
    expect(baseElement).toBeTruthy()
  })
})
