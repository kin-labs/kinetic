import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import { AdminUiLayout } from './admin-ui-layout'

describe('AdminUiLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <AdminUiLayout links={[]} />
      </BrowserRouter>,
    )
    expect(baseElement).toBeTruthy()
  })
})
