import { Route, Routes } from 'react-router-dom'
import { WebAdminFeatureWalletDetail } from './web-admin-feature-wallet-detail'
import { WebAdminFeatureWalletList } from './web-admin-feature-wallet-list'

export function WebAdminFeatureWallet() {
  return (
    <Routes>
      <Route index element={<WebAdminFeatureWalletList />} />
      <Route path=":walletId/*" element={<WebAdminFeatureWalletDetail />} />
    </Routes>
  )
}
