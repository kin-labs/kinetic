import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import { WebUiLink } from './web-ui-link'

describe('WebUiLink', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <WebUiLink path={''} label={''} />
      </BrowserRouter>,
    )
    expect(baseElement).toBeTruthy()
  })
})
