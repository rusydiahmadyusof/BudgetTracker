/**
 * Error Message Component
 * 
 * Purpose: Display error messages to users
 * 
 * Key Concepts Demonstrated:
 * - Error state UI
 * - User feedback patterns
 * 
 * Free Tools Used:
 * - Lucide React: Free icons
 * - TailwindCSS: Free styling
 * 
 * Usage:
 * <ErrorMessage message="Something went wrong" />
 */

'use client'

import { AlertCircle } from 'lucide-react'

/**
 * Error message component
 * 
 * @param {Object} props - Component props
 * @param {string} props.message - Error message to display
 * @param {string} props.className - Additional CSS classes
 */
const ErrorMessage = ({ message, className = '' }) => {
  if (!message) return null

  return (
    <div
      className={`flex items-center p-4 bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-800 rounded-lg ${className}`}
      role="alert"
    >
      <AlertCircle className="h-5 w-5 text-error-400 dark:text-error-400 mr-3 flex-shrink-0" aria-hidden="true" />
      <p className="text-sm text-error-800 dark:text-error-300">{message}</p>
    </div>
  )
}

export default ErrorMessage

