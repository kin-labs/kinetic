import { render } from '@testing-library/react'

import AdminUiTabs from './admin-ui-tabs'

describe('AdminUiTabs', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AdminUiTabs />)
    expect(baseElement).toBeTruthy()
  })
})
