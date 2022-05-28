import { render } from '@testing-library/react'

import { BrowserRouter } from 'react-router-dom'

import { App } from './app'

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App />)

    expect(baseElement).toBeTruthy()
  })

  it('should have the header and footer text', () => {
    const { getByText } = render(<App />)

    expect(getByText(/Mogami/gi)).toBeTruthy()
    expect(getByText(/Kin Foundation © 2022/gi)).toBeTruthy()
  })
})
