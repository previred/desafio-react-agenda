'use client'

import React from 'react'

/**
 * @description Componente que actúa como un límite de errores para capturar y manejar errores en la aplicación.
 *
 * Este componente renderiza un mensaje de error cuando se produce un error en los componentes hijos.
 * También proporciona una opción para recargar la página.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)

    this.state = { hasError: false, messageError: '' }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, mensajeError: error.message }
  }

  componentDidCatch(error, errorInfo) {
    console.log({ error, errorInfo })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='px-4 py-2 m-4'>
          <h1 className='mt-2 font-bold text-lg mb-1'>Hubo un error:</h1>
          <p> {this.state.mensajeError} </p>
          <button
            className='px-4 py-2 rounded bg-blue-800 hover:bg-blue-700 active:outline text-sm'
            onClick={() => (window.location.href = '/')}
          >
            Recargar la página{' '}
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
