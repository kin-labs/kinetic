import { render } from '@testing-library/react'

import { DemoServerFeature } from './demo-server-feature'

describe('DemoServerFeature', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DemoServerFeature />)
    expect(baseElement).toBeTruthy()
  })
})
