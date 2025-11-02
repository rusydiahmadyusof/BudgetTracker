/**
 * Badge Component
 * 
 * Purpose: Small status indicator component
 * 
 * Key Concepts Demonstrated:
 * - Simple component pattern
 * - Variant-based styling
 * - Size variants
 * 
 * Free Tools Used:
 * - TailwindCSS: Free styling
 * 
 * Usage:
 * <Badge variant="success">Active</Badge>
 * <Badge variant="error" size="sm">Error</Badge>
 */

'use client'

import { cn } from '../../lib/utils'

/**
 * Badge component
 * 
 * @param {Object} props - Component props
 * @param {string} props.variant - Badge variant: 'default', 'success', 'error', 'warning'
 * @param {string} props.size - Badge size: 'sm', 'md'
 * @param {React.ReactNode} props.children - Badge content
 * @param {string} props.className - Additional CSS classes
 */
const Badge = ({
  variant = 'default',
  size = 'md',
  children,
  className,
  ...props
}) => {
  // Base styles
  const baseStyles = 'inline-flex items-center font-medium rounded-full'

  // Variant styles
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-success-100 dark:bg-success-900/30 text-success-800 dark:text-success-300',
    error: 'bg-error-100 dark:bg-error-900/30 text-error-800 dark:text-error-300',
    warning: 'bg-warning-100 text-warning-800',
  }

  // Size styles
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
  }

  const badgeClasses = cn(
    baseStyles,
    variants[variant] || variants.default,
    sizes[size] || sizes.md,
    className
  )

  return (
    <span className={badgeClasses} {...props}>
      {children}
    </span>
  )
}

export default Badge

