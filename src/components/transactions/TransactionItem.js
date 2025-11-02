/**
 * Transaction Item Component
 * 
 * Purpose: Display a single transaction in a list
 * 
 * Key Concepts Demonstrated:
 * - List item rendering
 * - Conditional styling
 * - Date formatting
 * - Currency formatting
 * - Action buttons (edit/delete)
 * 
 * Free Tools Used:
 * - formatDate: Free utility
 * - formatCurrency: Free utility
 * 
 * Usage:
 * <TransactionItem
 *   transaction={transaction}
 *   category={category}
 *   onEdit={handleEdit}
 *   onDelete={handleDelete}
 * />
 */

'use client'

import { formatDate, formatCurrency } from '../../utils/formatters'
import { Edit2, Trash2 } from 'lucide-react'

/**
 * Single transaction item component
 * 
 * @param {Object} props - Component props
 * @param {Object} props.transaction - Transaction object
 * @param {Object} props.category - Category object (optional)
 * @param {function} props.onEdit - Edit handler
 * @param {function} props.onDelete - Delete handler
 */
const TransactionItem = ({ transaction, category, onEdit, onDelete }) => {
  const isIncome = transaction.type === 'income'

  return (
    <div className="px-6 py-4 border-b border-gray-200/80 dark:border-gray-600/80 hover:bg-gray-50/50 dark:hover:bg-gray-600/50 transition-colors duration-150 group">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          {/* Description */}
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
            {transaction.description}
          </p>

          {/* Category and Date */}
          <div className="flex items-center mt-2 space-x-3">
            {category && (
              <div className="flex items-center">
                <span
                  className="w-2.5 h-2.5 rounded-full mr-2 shadow-sm"
                  style={{ backgroundColor: category.color }}
                  aria-hidden="true"
                />
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{category.name}</span>
              </div>
            )}
            <span className="text-xs font-medium text-gray-400 dark:text-gray-500">
              {formatDate(transaction.date, 'MMM dd, yyyy')}
            </span>
          </div>
        </div>

        {/* Amount and Actions */}
        <div className="flex items-center space-x-4 ml-4">
          {/* Amount */}
          <p
            className={`text-sm font-bold ${
              isIncome ? 'text-success-500' : 'text-error-400'
            }`}
          >
            {isIncome ? '+' : '-'}
            {formatCurrency(Math.abs(transaction.amount))}
          </p>

          {/* Action Buttons - Enterprise styling */}
          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={() => onEdit(transaction)}
              className="p-2 text-gray-400 hover:text-primary-800 hover:bg-primary-50 rounded-lg transition-all duration-200"
              aria-label={`Edit ${transaction.description}`}
            >
              <Edit2 className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(transaction.id)}
              className="p-2 text-gray-400 hover:text-error-400 hover:bg-error-50 rounded-lg transition-all duration-200"
              aria-label={`Delete ${transaction.description}`}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionItem

