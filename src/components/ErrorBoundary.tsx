import React from 'react';

interface State {
  hasError: boolean;
  message?: string;
  stack?: string;
}

export default class ErrorBoundary extends React.Component<Record<string, unknown>, State> {
  constructor(props: Record<string, unknown>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, message: error.message, stack: error.stack };
  }

  componentDidCatch(error: Error, info: any) {
    // Log error to console (and later to analytics if configured)
    console.error('[ErrorBoundary] Caught error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24, textAlign: 'center' }} role="alert">
          <h2 style={{ marginBottom: 8 }}>Something went wrong</h2>
          <div style={{ marginBottom: 12, color: '#6b7280' }}>{this.state.message}</div>
          <details style={{ textAlign: 'left', whiteSpace: 'pre-wrap', maxHeight: '40vh', overflow: 'auto' }}>
            <summary style={{ cursor: 'pointer' }}>Show stack</summary>
            <pre style={{ fontSize: 12 }}>{this.state.stack}</pre>
          </details>
          <p style={{ marginTop: 12, color: '#6b7280' }}>Open developer console in your browser and copy the error message so I can debug further.</p>
        </div>
      );
    }

    return this.props.children as React.ReactElement;
  }
}
