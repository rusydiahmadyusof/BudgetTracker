/**
 * Budget Card Component
 * 
 * Purpose: Display a single budget with progress indicator
 * 
 * Key Concepts Demonstrated:
 * - Progress bar calculation
 * - Percentage calculations
 * - Color coding based on progress
 * - Conditional styling
 * 
 * Free Tools Used:
 * - Calculation utilities: Free functions
 * - formatCurrency: Free utility
 * 
 * Usage:
 * <BudgetCard
 *   budget={budget}
 *   category={category}
 *   spent={spentAmount}
 * />
 */

'use client'

import { formatCurrency } from '../../utils/formatters'
import { calculateBudgetProgress } from '../../utils/calculations'
import { cn } from '../../lib/utils'
import * as LucideIcons from 'lucide-react'

/**
 * Budget card component
 * 
 * @param {Object} props - Component props
 * @param {Object} props.budget - Budget object
 * @param {Object} props.category - Category object
 * @param {number} props.spent - Amount spent in this category
 * @param {function} props.onEdit - Edit handler
 * @param {function} props.onDelete - Delete handler
 * @param {string} props.className - Additional CSS classes
 */
const BudgetCard = ({
  budget,
  category,
  spent,
  onEdit,
  onDelete,
  className,
}) => {
  // Calculate progress percentage
  // Can exceed 100% if over budget
  const progress = calculateBudgetProgress(spent, budget.amount)

  // Determine status color based on progress
  // Green: under 50%, Yellow: 50-90%, Red: over 90%
  const getStatusColor = () => {
    if (progress >= 100) return 'error' // Over budget
    if (progress >= 90) return 'warning' // Close to budget
    return 'success' // Under budget
  }

  const statusColor = getStatusColor()

  // Color classes based on status
  const progressColors = {
    success: 'bg-success-500',
    warning: 'bg-warning-500',
    error: 'bg-error-500',
  }

  const borderColors = {
    success: 'border-success-200',
    warning: 'border-warning-200',
    error: 'border-error-200',
  }

  // Get icon component
  const IconComponent = category?.icon
    ? LucideIcons[category.icon] || LucideIcons.Target
    : LucideIcons.Target

  // Calculate remaining amount
  const remaining = budget.amount - spent

  return (
    <div
      className={cn(
        'bg-white dark:bg-gray-700 rounded-xl border border-gray-200/80 dark:border-gray-600/80 p-6 shadow-sm hover:shadow-md transition-all duration-200',
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3 flex-1">
          {/* Category Icon */}
          {category && (
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${category.color}20` }}
            >
              <IconComponent
                className="h-6 w-6"
                style={{ color: category.color }}
                aria-hidden="true"
              />
            </div>
          )}

          {/* Category Name */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
              {category?.name || 'Uncategorized'}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {budget.period === 'monthly' ? 'Monthly' : 'Weekly'} Budget
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 ml-4">
          <button
            onClick={() => onEdit(budget)}
            className="p-2 text-gray-400 hover:text-primary-800 hover:bg-primary-50 rounded-lg transition-colors"
            aria-label="Edit budget"
          >
            <LucideIcons.Edit2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Budget Amounts */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">Budget</span>
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {formatCurrency(budget.amount)}
          </span>
        </div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">Spent</span>
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {formatCurrency(spent)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">Remaining</span>
          <span
            className={cn(
              'text-sm font-semibold',
              remaining >= 0 ? 'text-success-500' : 'text-error-400'
            )}
          >
            {formatCurrency(Math.abs(remaining))}
            {remaining < 0 && ' over'}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-2">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Progress</span>
          <span
            className={cn(
              'text-xs font-semibold',
              statusColor === 'error' && 'text-error-400',
              statusColor === 'warning' && 'text-warning-600',
              statusColor === 'success' && 'text-success-500'
            )}
          >
            {progress}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
          <div
            className={cn(
              'h-2.5 rounded-full transition-all',
              progressColors[statusColor] || progressColors.success
            )}
            style={{ width: `${Math.min(progress, 100)}%` }}
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>

      {/* Status Message */}
      {progress >= 100 && (
        <p className="text-xs text-error-400 font-medium mt-2">
          Budget exceeded!
        </p>
      )}
      {progress >= 90 && progress < 100 && (
        <p className="text-xs text-warning-600 font-medium mt-2">
          Approaching budget limit
        </p>
      )}
    </div>
  )
}

export default BudgetCard

