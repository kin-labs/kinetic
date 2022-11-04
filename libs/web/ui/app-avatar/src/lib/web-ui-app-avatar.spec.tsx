import { render } from '@testing-library/react'

import { WebUiAppAvatar } from './web-ui-app-avatar'

describe('WebUiAppAvatar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WebUiAppAvatar />)
    expect(baseElement).toBeTruthy()
  })
})
