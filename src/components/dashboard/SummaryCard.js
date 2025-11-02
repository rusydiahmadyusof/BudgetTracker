/**
 * Summary Card Component
 * 
 * Purpose: Display summary statistics (Income, Expenses, Balance)
 * 
 * Key Concepts Demonstrated:
 * - Props and data display
 * - Conditional styling based on values
 * - Number formatting
 * - Icon usage
 * 
 * Free Tools Used:
 * - Lucide React: Free icons
 * - formatCurrency: Free utility function (uses Intl API)
 * 
 * Usage:
 * <SummaryCard
 *   title="Total Income"
 *   amount={1234.56}
 *   icon={ArrowUpCircle}
 *   trend="+5%"
 *   variant="success"
 * />
 */

'use client'

import { formatCurrency } from '../../utils/formatters'
import { cn } from '../../lib/utils'

/**
 * Summary card component
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Card title
 * @param {number} props.amount - Amount to display
 * @param {React.Component} props.icon - Icon component
 * @param {string} props.trend - Trend indicator (e.g., "+5%")
 * @param {string} props.variant - Color variant: 'success', 'error', 'default'
 * @param {string} props.className - Additional CSS classes
 */
const SummaryCard = ({
  title,
  amount,
  icon: Icon,
  trend,
  variant = 'default',
  className,
}) => {
  // Icon background variants - Finance-Trust Theme
  const iconVariants = {
    success: 'bg-success-50 text-success-500',
    error: 'bg-error-50 text-error-400',
    default: 'bg-primary-50 text-primary-800',
  }

  return (
    <div
      className={cn(
        'p-6 rounded-xl border border-gray-200/80 dark:border-gray-600/80 bg-white dark:bg-gray-700 shadow-sm hover:shadow-md transition-all duration-200',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          {/* Title */}
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{title}</p>

          {/* Amount - formatted as currency */}
          <p className={cn(
            'text-3xl font-bold tracking-tight',
            variant === 'success' && 'text-success-500',
            variant === 'error' && 'text-error-400',
            variant === 'default' && 'text-primary-800'
          )}>
            {formatCurrency(amount)}
          </p>

          {/* Trend indicator (if provided) */}
          {trend && (
            <p className="text-xs font-medium text-gray-500 mt-2">{trend}</p>
          )}
        </div>

        {/* Icon - Enterprise styling */}
        {Icon && (
          <div className={cn(
            'ml-4 p-3 rounded-lg',
            iconVariants[variant] || iconVariants.default
          )}>
            <Icon className="h-6 w-6" aria-hidden="true" />
          </div>
        )}
      </div>
    </div>
  )
}

export default SummaryCard

