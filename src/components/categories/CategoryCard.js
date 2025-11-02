/**
 * Category Card Component
 * 
 * Purpose: Display a single category card
 * 
 * Key Concepts Demonstrated:
 * - Card component pattern
 * - Icon rendering (dynamic icons from Lucide)
 * - Color indicators
 * - Action buttons
 * 
 * Free Tools Used:
 * - Lucide React: Free icons (dynamic import)
 * 
 * Usage:
 * <CategoryCard
 *   category={category}
 *   transactionCount={5}
 *   onEdit={handleEdit}
 *   onDelete={handleDelete}
 * />
 */

'use client'

import { Edit2, Trash2 } from 'lucide-react'
import * as LucideIcons from 'lucide-react'

/**
 * Category card component
 * 
 * @param {Object} props - Component props
 * @param {Object} props.category - Category object
 * @param {number} props.transactionCount - Number of transactions in this category
 * @param {function} props.onEdit - Edit handler
 * @param {function} props.onDelete - Delete handler
 */
const CategoryCard = ({
  category,
  transactionCount = 0,
  onEdit,
  onDelete,
}) => {
  // Dynamically get icon component from Lucide
  // This allows us to store icon names as strings and render them dynamically
  const IconComponent = category.icon
    ? LucideIcons[category.icon] || LucideIcons.Tag
    : LucideIcons.Tag

  return (
    <div className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200/80 dark:border-gray-600/80 p-6 hover:shadow-lg transition-all duration-200 group">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4 flex-1">
          {/* Color Indicator - Enterprise styling */}
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center shadow-sm"
            style={{ backgroundColor: `${category.color}15` }}
          >
            <IconComponent
              className="h-7 w-7"
              style={{ color: category.color }}
              aria-hidden="true"
            />
          </div>

          {/* Category Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
              {category.name}
            </h3>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1.5">
              {transactionCount} {transactionCount === 1 ? 'transaction' : 'transactions'}
            </p>
          </div>
        </div>

        {/* Action Buttons - Enterprise styling */}
        <div className="flex items-center space-x-1 ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => onEdit(category)}
            className="p-2 text-gray-400 hover:text-primary-800 hover:bg-primary-50 rounded-lg transition-all duration-200"
            aria-label={`Edit ${category.name}`}
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(category.id)}
            className="p-2 text-gray-400 hover:text-error-400 hover:bg-error-50 rounded-lg transition-all duration-200"
            aria-label={`Delete ${category.name}`}
            disabled={transactionCount > 0}
            title={
              transactionCount > 0
                ? 'Cannot delete category with transactions'
                : 'Delete category'
            }
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CategoryCard

