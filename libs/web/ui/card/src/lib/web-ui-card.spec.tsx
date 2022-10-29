import { render } from '@testing-library/react'

import { WebUiCard } from './web-ui-card'

describe('WebUiCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WebUiCard>hi</WebUiCard>)
    expect(baseElement).toBeTruthy()
  })
})
