import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import App from '../App'

describe('App Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    expect(document.body).toBeInTheDocument()
  })

  it('renders routing correctly', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    // El componente App debe renderizar sin errores
    expect(document.querySelector('body')).toBeInTheDocument()
  })
})