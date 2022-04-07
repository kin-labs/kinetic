import { render } from '@testing-library/react'

import { AdminAppUiTable } from './admin-app-ui-table'

describe('AdminAppUiTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AdminAppUiTable apps={[]} />)
    expect(baseElement).toBeTruthy()
  })
})
