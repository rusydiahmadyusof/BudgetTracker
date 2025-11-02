/**
 * Button Component
 * 
 * Purpose: Reusable button component with variants and sizes
 * 
 * Key Concepts Demonstrated:
 * - Component composition
 * - Props and propTypes
 * - Conditional className merging
 * - Forward ref pattern
 * - Accessibility features
 * 
 * Free Tools Used:
 * - TailwindCSS: Free styling (no CSS files needed)
 * - React: Built-in features (forwardRef)
 * 
 * This component demonstrates:
 * - How to create reusable UI components
 * - Variant-based styling patterns
 * - Accessibility best practices
 */

'use client'

import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

/**
 * Button component with variants and sizes
 * 
 * @param {Object} props - Component props
 * @param {string} props.variant - Button variant: 'primary', 'secondary', 'danger', 'ghost'
 * @param {string} props.size - Button size: 'sm', 'md', 'lg'
 * @param {boolean} props.loading - Show loading state
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props...rest - Other button props (onClick, disabled, etc.)
 * 
 * Usage:
 * <Button variant="primary" size="md" onClick={handleClick}>
 *   Click Me
 * </Button>
 */
const Button = forwardRef(({
  variant = 'primary',
  size = 'md',
  loading = false,
  className,
  children,
  disabled,
  ...props
}, ref) => {
  // Base styles - Enterprise button styling
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none shadow-sm hover:shadow-md'

  // Variant styles - Finance-Trust Theme (with dark mode support)
  const variants = {
    primary: 'bg-primary-800 dark:bg-primary-dark text-white hover:bg-primary-900 dark:hover:bg-primary-dark/90 focus:ring-primary-800 dark:focus:ring-primary-dark active:bg-primary-900 dark:active:bg-primary-dark/90 shadow-primary-800/25 dark:shadow-primary-dark/25 border border-transparent dark:border-primary-dark/50',
    secondary: 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 focus:ring-gray-400 dark:focus:ring-gray-500 active:bg-gray-100 dark:active:bg-gray-600',
    danger: 'bg-error-400 dark:bg-error-400 text-white hover:bg-error-500 dark:hover:bg-error-500 focus:ring-error-400 dark:focus:ring-error-400 active:bg-error-500 dark:active:bg-error-500 shadow-error-400/25 border border-transparent dark:border-error-500/50',
    ghost: 'bg-transparent text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-gray-400 dark:focus:ring-gray-500 active:bg-gray-200 dark:active:bg-gray-600 shadow-none border border-transparent',
  }

  // Size styles - Professional sizing
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  }

  // Merge all classes using our cn utility
  // This allows conditional classes and overrides
  const buttonClasses = cn(
    baseStyles,
    variants[variant] || variants.primary,
    sizes[size] || sizes.md,
    className // Allow custom classes to override defaults
  )

  return (
    <button
      ref={ref}
      className={buttonClasses}
      disabled={disabled || loading}
      aria-busy={loading}
      aria-disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="mr-2" aria-hidden="true">
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </span>
      )}
      {children}
    </button>
  )
})

Button.displayName = 'Button'

export default Button

