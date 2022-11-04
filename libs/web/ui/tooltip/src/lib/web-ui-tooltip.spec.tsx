import { render } from '@testing-library/react'

import { WebUiTooltip } from './web-ui-tooltip'

describe('WebUiTooltip', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WebUiTooltip label={'hi'}>content</WebUiTooltip>)
    expect(baseElement).toBeTruthy()
  })
})
