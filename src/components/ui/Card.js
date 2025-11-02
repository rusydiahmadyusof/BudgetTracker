/**
 * Card Component
 * 
 * Purpose: Reusable card container component
 * 
 * Key Concepts Demonstrated:
 * - Component composition
 * - Children prop pattern
 * - Compound components pattern (CardHeader, CardContent, CardFooter)
 * 
 * Free Tools Used:
 * - TailwindCSS: Free styling utilities
 * 
 * Usage:
 * <Card>
 *   <CardHeader>Title</CardHeader>
 *   <CardContent>Content</CardContent>
 *   <CardFooter>Footer</CardFooter>
 * </Card>
 */

'use client'

import { cn } from '../../lib/utils'

/**
 * Main Card component
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.className - Additional CSS classes
 */
export const Card = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        'bg-white dark:bg-gray-700 rounded-xl shadow-sm border border-gray-200/80 dark:border-gray-600/80 hover:shadow-md transition-all duration-200',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * Card Header component
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Header content
 * @param {string} props.className - Additional CSS classes
 */
export const CardHeader = ({ children, className, ...props }) => {
  return (
    <div
      className={cn('px-6 py-5 border-b border-gray-200/80 dark:border-gray-600/80 bg-gray-50/50 dark:bg-gray-800/50', className)}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * Card Content component
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content
 * @param {string} props.className - Additional CSS classes
 */
export const CardContent = ({ children, className, ...props }) => {
  return (
    <div className={cn('px-6 py-5', className)} {...props}>
      {children}
    </div>
  )
}

/**
 * Card Footer component
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Footer content
 * @param {string} props.className - Additional CSS classes
 */
export const CardFooter = ({ children, className, ...props }) => {
  return (
    <div
      className={cn('px-6 py-5 border-t border-gray-200/80 dark:border-gray-600/80 bg-gray-50/50 dark:bg-gray-800/50', className)}
      {...props}
    >
      {children}
    </div>
  )
}

