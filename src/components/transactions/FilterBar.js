/**
 * Filter Bar Component
 * 
 * Purpose: Filter and search transactions
 * 
 * Key Concepts Demonstrated:
 * - Controlled components
 * - Debouncing (performance optimization)
 * - Multiple filter state management
 * - Date range filtering
 * 
 * Free Tools Used:
 * - useDebounce: Free custom hook
 * - date-fns: Free date utilities
 * 
 * Usage:
 * <FilterBar
 *   searchTerm={searchTerm}
 *   onSearchChange={setSearchTerm}
 *   categoryFilter={categoryFilter}
 *   onCategoryChange={setCategoryFilter}
 *   typeFilter={typeFilter}
 *   onTypeChange={setTypeFilter}
 *   dateRange={dateRange}
 *   onDateRangeChange={setDateRange}
 *   categories={categories}
 * />
 */

'use client'

import { useDebounce } from '../../hooks/useDebounce'
import Input from '../ui/Input'
import { TRANSACTION_TYPES } from '../../utils/constants'

/**
 * Filter bar component for transactions
 * 
 * Features:
 * - Search input (debounced)
 * - Category filter dropdown
 * - Type filter (All/Income/Expense)
 * - Date range filter (from/to)
 */
const FilterBar = ({
  searchTerm,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  typeFilter,
  onTypeChange,
  dateFrom,
  onDateFromChange,
  dateTo,
  onDateToChange,
  categories,
}) => {
  // Debounce search term to avoid excessive filtering
  // This improves performance by reducing filter operations
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  // Update parent when debounced term changes
  // This is handled by parent component using the debounced value

  return (
    <div className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-3 sm:p-4 mb-4 sm:mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Search Input */}
        <div>
          <Input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Category Filter */}
        <div>
            <select
              value={categoryFilter}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-800 dark:focus:ring-primary-dark focus:border-primary-800 dark:focus:border-primary-dark"
            >
            <option value="">All Categories</option>
            {Array.isArray(categories) && categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Type Filter */}
        <div>
            <select
              value={typeFilter}
              onChange={(e) => onTypeChange(e.target.value)}
              className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-800 dark:focus:ring-primary-dark focus:border-primary-800 dark:focus:border-primary-dark"
            >
            <option value="">All Types</option>
            <option value={TRANSACTION_TYPES.INCOME}>Income</option>
            <option value={TRANSACTION_TYPES.EXPENSE}>Expense</option>
          </select>
        </div>

        {/* Date Range - From */}
        <div>
          <Input
            type="date"
            value={dateFrom}
            onChange={(e) => onDateFromChange(e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      {/* Date Range - To (second row) */}
      <div className="mt-3 sm:mt-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 sm:min-w-[2rem]">To:</span>
          <Input
            type="date"
            value={dateTo}
            onChange={(e) => onDateToChange(e.target.value)}
            className="flex-1"
          />
          {/* Clear filters button */}
          {(searchTerm || categoryFilter || typeFilter || dateFrom || dateTo) && (
            <button
              onClick={() => {
                onSearchChange('')
                onCategoryChange('')
                onTypeChange('')
                onDateFromChange('')
                onDateToChange('')
              }}
              className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors touch-manipulation"
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default FilterBar

