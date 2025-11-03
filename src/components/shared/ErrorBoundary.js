/**
 * Error Boundary Component
 * 
 * Purpose: Catch React errors and display fallback UI
 * 
 * Key Concepts Demonstrated:
 * - React Error Boundary pattern
 * - Error handling at component tree level
 * - Fallback UI rendering
 * 
 * Free Tools Used:
 * - React: Built-in error boundary pattern
 * 
 * Usage:
 * <ErrorBoundary>
 *   <YourComponent />
 * </ErrorBoundary>
 */

'use client'

import React from 'react'
import { AlertTriangle } from 'lucide-react'
import Button from '../ui/Button'

class ErrorBoundaryClass extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console for debugging
    console.error('Error caught by boundary:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800 p-4">
          <div className="max-w-md w-full bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 shadow-lg p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-error-50 dark:bg-error-900/20 rounded-full">
                <AlertTriangle className="h-8 w-8 text-error-500 dark:text-error-400" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Something went wrong
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We encountered an unexpected error. Please try refreshing the page.
            </p>
            <div className="flex gap-3 justify-center">
              <Button
                variant="primary"
                onClick={() => window.location.reload()}
              >
                Refresh Page
              </Button>
              <Button
                variant="secondary"
                onClick={this.handleReset}
              >
                Try Again
              </Button>
            </div>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="text-sm text-gray-500 dark:text-gray-400 cursor-pointer mb-2">
                  Error Details (Development Only)
                </summary>
                <pre className="text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-auto max-h-40">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

/**
 * Error Boundary wrapper component
 */
const ErrorBoundary = ({ children }) => {
  return <ErrorBoundaryClass>{children}</ErrorBoundaryClass>
}

export default ErrorBoundary

