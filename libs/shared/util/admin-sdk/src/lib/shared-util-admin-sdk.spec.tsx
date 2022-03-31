import { render } from '@testing-library/react'

import SharedUtilAdminSdk from './shared-util-admin-sdk'

describe('SharedUtilAdminSdk', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SharedUtilAdminSdk />)
    expect(baseElement).toBeTruthy()
  })
})
