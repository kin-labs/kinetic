import { render } from '@testing-library/react'

import { AdminUserUiTable } from './admin-user-ui-table'

describe('AdminUserUiTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <AdminUserUiTable
        users={[]}
        deleteUser={async () => {
          console.log('')
        }}
      />,
    )
    expect(baseElement).toBeTruthy()
  })
})
