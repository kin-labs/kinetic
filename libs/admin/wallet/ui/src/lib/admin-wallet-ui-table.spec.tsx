import { render } from '@testing-library/react'

import { AdminWalletUiTable } from './admin-wallet-ui-table'

describe('AdminWalletUiTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <AdminWalletUiTable
        wallets={[]}
        deleteWallet={async () => {
          console.log('')
        }}
      />,
    )
    expect(baseElement).toBeTruthy()
  })
})
