/**
 * Input Component
 * 
 * Purpose: Reusable input component with variants
 * 
 * Key Concepts Demonstrated:
 * - Controlled components pattern
 * - Forward ref pattern
 * - Input types handling
 * - Error state styling
 * - Accessibility features
 * 
 * Free Tools Used:
 * - TailwindCSS: Free styling
 * - React: Built-in features
 * 
 * Usage:
 * <Input
 *   type="text"
 *   value={value}
 *   onChange={(e) => setValue(e.target.value)}
 *   placeholder="Enter text"
 *   error="Error message"
 * />
 */

'use client'

import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

/**
 * Input component with error handling
 * 
 * @param {Object} props - Component props
 * @param {string} props.type - Input type: 'text', 'number', 'date', 'email', etc.
 * @param {string} props.error - Error message to display
 * @param {string} props.label - Label text
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props...rest - Other input props (value, onChange, placeholder, etc.)
 */
const Input = forwardRef(({
  type = 'text',
  error,
  label,
  className,
  ...props
}, ref) => {
  // Base input styles - Enterprise styling with dark mode
  const baseStyles = 'w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all duration-200 shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 border-gray-300 dark:border-gray-600'

  // Error state styles
  const errorStyles = error
    ? 'border-error-400 dark:border-error-400 focus:ring-error-400 dark:focus:ring-error-400'
    : 'focus:ring-primary-800 dark:focus:ring-primary-dark focus:border-primary-800 dark:focus:border-primary-dark'

  // Disabled state styles
  const disabledStyles = props.disabled
    ? 'bg-gray-50 dark:bg-gray-800 cursor-not-allowed'
    : 'hover:border-gray-400 dark:hover:border-gray-500'

  // Merge classes
  const inputClasses = cn(baseStyles, errorStyles, disabledStyles, className)

  return (
    <div className="w-full">
      {/* Label - important for accessibility */}
      {label && (
        <label
          htmlFor={props.id}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
          {props.required && <span className="text-error-500 ml-1">*</span>}
        </label>
      )}

      {/* Input element */}
      <input
        ref={ref}
        type={type}
        className={inputClasses}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${props.id}-error` : undefined}
        {...props}
      />

      {/* Error message - shown below input */}
      {error && (
        <p
          id={props.id ? `${props.id}-error` : undefined}
          className="mt-1 text-sm text-error-400"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input

