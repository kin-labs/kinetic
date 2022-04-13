import { render } from '@testing-library/react'

import { DemoSdkFeature } from './demo-sdk-feature'

describe('DemoSdkFeature', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DemoSdkFeature />)
    expect(baseElement).toBeTruthy()
  })
})
