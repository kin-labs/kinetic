import { render } from '@testing-library/react'

import { WebUiDataTable } from './web-ui-data-table'

describe('WebUiTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WebUiDataTable columns={[]} data={[]} />)
    expect(baseElement).toBeTruthy()
  })
})
