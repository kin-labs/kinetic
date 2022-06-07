import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import { AdminUiTabs } from './admin-ui-tabs'

describe('AdminUiTabs', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <AdminUiTabs tabs={[]}>
          <div>Hi</div>
        </AdminUiTabs>
      </BrowserRouter>,
    )
    expect(baseElement).toBeTruthy()
  })
})
