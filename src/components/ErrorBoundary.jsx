import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('App render error:', error, info)
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif', color: '#211c18' }}>
          <h1>Something went wrong loading the site</h1>
          <pre style={{ whiteSpace: 'pre-wrap', color: '#b24e2c' }}>{this.state.error.message}</pre>
          <p>Try a hard refresh (Ctrl+Shift+R). If this persists, check the browser console.</p>
        </div>
      )
    }

    return this.props.children
  }
}
