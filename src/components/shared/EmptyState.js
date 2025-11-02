/**
 * Empty State Component
 * 
 * Purpose: Display when there's no data to show
 * 
 * Key Concepts Demonstrated:
 * - Conditional rendering patterns
 * - User-friendly empty states
 * - Call-to-action buttons
 * 
 * Free Tools Used:
 * - Lucide React: Free icons
 * - TailwindCSS: Free styling
 * 
 * Usage:
 * <EmptyState
 *   icon={Wallet}
 *   title="No transactions yet"
 *   message="Get started by adding your first transaction"
 *   actionLabel="Add Transaction"
 *   onAction={handleAdd}
 * />
 */

'use client'

/**
 * Empty state component
 * 
 * @param {Object} props - Component props
 * @param {React.Component} props.icon - Icon component from Lucide React
 * @param {string} props.title - Title text
 * @param {string} props.message - Description message
 * @param {string} props.actionLabel - Label for action button (optional)
 * @param {function} props.onAction - Action handler function (optional)
 */
const EmptyState = ({
  icon: Icon,
  title,
  message,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 shadow-sm">
      {/* Icon */}
      {Icon && (
        <div className="mb-4">
          <Icon className="h-16 w-16 text-gray-400 dark:text-gray-500" aria-hidden="true" />
        </div>
      )}

      {/* Title */}
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">{title}</h3>

      {/* Message */}
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-sm">{message}</p>

      {/* Action button (if provided) */}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-800 dark:bg-primary-dark hover:bg-primary-900 dark:hover:bg-primary-dark/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-800 dark:focus:ring-primary-dark transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}

export default EmptyState

