/**
 * Recent Transactions Component
 * 
 * Purpose: Display recent transactions on dashboard
 * 
 * Key Concepts Demonstrated:
 * - Array slicing (getting last N items)
 * - Date formatting
 * - Conditional rendering
 * - Empty state handling
 * 
 * Free Tools Used:
 * - formatDate: Free utility (uses date-fns)
 * - formatCurrency: Free utility (uses Intl API)
 * 
 * Usage:
 * <RecentTransactions limit={10} />
 */

'use client'

import { useTransactions } from '../../hooks/useTransactions'
import { useBudget } from '../../context/BudgetContext'
import { formatDate, formatCurrency } from '../../utils/formatters'
import EmptyState from '../shared/EmptyState'
import { Receipt } from 'lucide-react'
import Link from 'next/link'

/**
 * Recent transactions component
 * 
 * @param {Object} props - Component props
 * @param {number} props.limit - Number of transactions to show (default: 10)
 */
const RecentTransactions = ({ limit = 10 }) => {
  const { transactions } = useTransactions()
  const { categories } = useBudget()

  // Get recent transactions (last N, sorted by date descending)
  // Safety check: ensure transactions is an array
  const recentTransactions = Array.isArray(transactions)
    ? [...transactions]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, limit)
    : []

  // Get category name by ID
  const getCategoryName = (categoryId) => {
    if (!Array.isArray(categories)) return 'Uncategorized'
    const category = categories.find((cat) => cat.id === categoryId)
    return category?.name || 'Uncategorized'
  }

  // Get category color by ID
  const getCategoryColor = (categoryId) => {
    if (!Array.isArray(categories)) return '#6B7280'
    const category = categories.find((cat) => cat.id === categoryId)
    return category?.color || '#6B7280'
  }

  // Empty state
  if (recentTransactions.length === 0) {
    return (
      <EmptyState
        icon={Receipt}
        title="No transactions yet"
        message="Get started by adding your first transaction"
        actionLabel="Add Transaction"
        onAction={() => (window.location.href = '/transactions')}
      />
    )
  }

  return (
    <div className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200/80 dark:border-gray-600/80 shadow-sm">
      <div className="px-4 sm:px-3 sm:px-4 lg:px-6 py-3 sm:py-4 sm:py-5 border-b border-gray-200/80 dark:border-gray-600/80 flex items-center justify-between bg-gray-50/50 dark:bg-gray-800/50">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100">Recent Transactions</h2>
        <Link
          href="/transactions"
          className="text-sm text-primary-800 dark:text-primary-dark hover:text-primary-900 dark:hover:text-primary-dark/80 font-semibold transition-colors duration-200"
        >
          View All →
        </Link>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-600">
        {recentTransactions.map((transaction) => {
          const isIncome = transaction.type === 'income'
          const categoryName = transaction.categoryId
            ? getCategoryName(transaction.categoryId)
            : null
          const categoryColor = transaction.categoryId
            ? getCategoryColor(transaction.categoryId)
            : null

          return (
            <div
              key={transaction.id}
              className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  {/* Description */}
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {transaction.description}
                  </p>

                  {/* Category and Date */}
                  <div className="flex items-center mt-1 space-x-3">
                    {categoryName && (
                      <div className="flex items-center">
                        <span
                          className="w-2 h-2 rounded-full mr-2"
                          style={{ backgroundColor: categoryColor }}
                          aria-hidden="true"
                        />
                        <span className="text-xs text-gray-500">{categoryName}</span>
                      </div>
                    )}
                    <span className="text-xs text-gray-400">
                      {formatDate(transaction.date, 'MMM dd, yyyy')}
                    </span>
                  </div>
                </div>

                {/* Amount */}
                <div className="ml-2 sm:ml-4 flex-shrink-0">
                  <p
                    className={`text-sm font-semibold ${
                      isIncome ? 'text-success-500' : 'text-error-400'
                    }`}
                  >
                    {isIncome ? '+' : '-'}
                    {formatCurrency(Math.abs(transaction.amount))}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RecentTransactions

