import { render } from '@testing-library/react'

import { BrowserRouter } from 'react-router-dom'

import App from './app'

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App />)

    expect(baseElement).toBeTruthy()
  })

  it('should have a greeting as the title', () => {
    const { getByText } = render(<App />)

    expect(getByText(/Loading.../gi)).toBeTruthy()
  })
})
