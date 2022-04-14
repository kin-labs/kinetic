import { render } from '@testing-library/react'

import { DemoKeypairFeature } from './demo-keypair-feature'

describe('DemoKeypairFeature', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DemoKeypairFeature />)
    expect(baseElement).toBeTruthy()
  })
})
