import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import InputPregunta from '../componentes/InputPregunta'

describe('InputPregunta Component', () => {
  it('renders input with correct placeholder', () => {
    render(<InputPregunta />)
    
    const input = screen.getByPlaceholderText('¿Cuál es tu pregunta?')
    expect(input).toBeInTheDocument()
    expect(input).toBeInstanceOf(HTMLInputElement)
  })

  it('renders as an input element', () => {
    render(<InputPregunta />)
    
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
  })
})