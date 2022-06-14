import { render } from '@testing-library/react'

import { BrowserRouter } from 'react-router-dom'

import { App } from './app'

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    )

    expect(baseElement).toBeTruthy()
  })

  it('should have the header and footer text', () => {
    const { getByText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    )

    expect(getByText(/Kinetic/gi)).toBeTruthy()
    expect(getByText(/Kin Foundation © 2022/gi)).toBeTruthy()
  })
})
