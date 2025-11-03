/**
 * Search Modal Component
 * 
 * Purpose: Global search functionality
 * 
 * Key Concepts Demonstrated:
 * - Search across multiple data types
 * - Modal dialog
 * - Result highlighting
 * 
 * Free Tools Used:
 * - Lucide React: Free icons
 * 
 * Usage:
 * <SearchModal isOpen={isOpen} onClose={onClose} />
 */

'use client'

import { useState, useEffect, useMemo } from 'react'
import { Search, Receipt, Tag, Target } from 'lucide-react'
import Modal from '../ui/Modal'
import { useTransactions } from '../../hooks/useTransactions'
import { useBudget } from '../../context/BudgetContext'
import { formatCurrency, formatDate } from '../../utils/formatters'
import { cn } from '../../lib/utils'

/**
 * Search modal component
 */
const SearchModal = ({ isOpen, onClose }) => {
  const { transactions } = useTransactions()
  const { categories, budgets } = useBudget()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all') // 'all', 'transactions', 'categories', 'budgets'

  // Clear search when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSearchTerm('')
      setSelectedCategory('all')
    }
  }, [isOpen])

  // Search results
  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) {
      return {
        transactions: [],
        categories: [],
        budgets: [],
      }
    }

    const term = searchTerm.toLowerCase().trim()
    const results = {
      transactions: [],
      categories: [],
      budgets: [],
    }

    // Search transactions
    if (selectedCategory === 'all' || selectedCategory === 'transactions') {
      if (Array.isArray(transactions)) {
        results.transactions = transactions.filter((transaction) => {
          const description = transaction.description?.toLowerCase() || ''
          const amount = transaction.amount?.toString() || ''
          const type = transaction.type?.toLowerCase() || ''
          
          // Get category name
          const category = Array.isArray(categories)
            ? categories.find((cat) => cat.id === transaction.categoryId)
            : null
          const categoryName = category?.name?.toLowerCase() || ''

          return (
            description.includes(term) ||
            amount.includes(term) ||
            type.includes(term) ||
            categoryName.includes(term)
          )
        }).slice(0, 5) // Limit to 5 results
      }
    }

    // Search categories
    if (selectedCategory === 'all' || selectedCategory === 'categories') {
      if (Array.isArray(categories)) {
        results.categories = categories.filter((category) => {
          const name = category.name?.toLowerCase() || ''
          return name.includes(term)
        }).slice(0, 5)
      }
    }

    // Search budgets
    if (selectedCategory === 'all' || selectedCategory === 'budgets') {
      if (Array.isArray(budgets)) {
        results.budgets = budgets.filter((budget) => {
          const amount = budget.amount?.toString() || ''
          const period = budget.period?.toLowerCase() || ''
          
          // Get category name
          const category = Array.isArray(categories)
            ? categories.find((cat) => cat.id === budget.categoryId)
            : null
          const categoryName = category?.name?.toLowerCase() || ''

          return (
            amount.includes(term) ||
            period.includes(term) ||
            categoryName.includes(term)
          )
        }).slice(0, 5)
      }
    }

    return results
  }, [searchTerm, selectedCategory, transactions, categories, budgets])

  const totalResults =
    searchResults.transactions.length +
    searchResults.categories.length +
    searchResults.budgets.length

  const getCategoryName = (categoryId) => {
    if (!Array.isArray(categories)) return 'Unknown'
    const category = categories.find((cat) => cat.id === categoryId)
    return category?.name || 'Unknown'
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Search" size="lg">
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search transactions, categories, budgets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            autoFocus
          />
        </div>

        {/* Category Filter */}
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={cn(
              'px-3 py-1.5 text-sm font-medium rounded-lg transition-colors',
              selectedCategory === 'all'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            )}
          >
            All
          </button>
          <button
            onClick={() => setSelectedCategory('transactions')}
            className={cn(
              'px-3 py-1.5 text-sm font-medium rounded-lg transition-colors',
              selectedCategory === 'transactions'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            )}
          >
            Transactions
          </button>
          <button
            onClick={() => setSelectedCategory('categories')}
            className={cn(
              'px-3 py-1.5 text-sm font-medium rounded-lg transition-colors',
              selectedCategory === 'categories'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            )}
          >
            Categories
          </button>
          <button
            onClick={() => setSelectedCategory('budgets')}
            className={cn(
              'px-3 py-1.5 text-sm font-medium rounded-lg transition-colors',
              selectedCategory === 'budgets'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            )}
          >
            Budgets
          </button>
        </div>

        {/* Search Results */}
        {searchTerm.trim() && (
          <div className="max-h-96 overflow-y-auto space-y-4">
            {totalResults === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <Search className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No results found</p>
              </div>
            ) : (
              <>
                {/* Transactions Results */}
                {searchResults.transactions.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                      <Receipt className="h-4 w-4" />
                      Transactions ({searchResults.transactions.length})
                    </h3>
                    <div className="space-y-2">
                      {searchResults.transactions.map((transaction) => (
                        <div
                          key={transaction.id}
                          className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                          onClick={() => {
                            window.location.href = '/transactions'
                            onClose()
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                                {transaction.description}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {getCategoryName(transaction.categoryId)}
                                </span>
                                <span className="text-xs text-gray-400">•</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {formatDate(transaction.date, 'MMM dd, yyyy')}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <p
                                className={cn(
                                  'text-sm font-semibold',
                                  transaction.type === 'income'
                                    ? 'text-success-500'
                                    : 'text-error-400'
                                )}
                              >
                                {transaction.type === 'income' ? '+' : '-'}
                                {formatCurrency(Math.abs(transaction.amount))}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Categories Results */}
                {searchResults.categories.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      Categories ({searchResults.categories.length})
                    </h3>
                    <div className="space-y-2">
                      {searchResults.categories.map((category) => (
                        <div
                          key={category.id}
                          className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                          onClick={() => {
                            window.location.href = '/categories'
                            onClose()
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="w-8 h-8 rounded-lg flex items-center justify-center"
                              style={{ backgroundColor: category.color || '#6B7280' }}
                            >
                              {category.icon && (
                                <span className="text-white text-xs">
                                  {category.icon}
                                </span>
                              )}
                            </div>
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {category.name}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Budgets Results */}
                {searchResults.budgets.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Budgets ({searchResults.budgets.length})
                    </h3>
                    <div className="space-y-2">
                      {searchResults.budgets.map((budget) => (
                        <div
                          key={budget.id}
                          className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                          onClick={() => {
                            window.location.href = '/budgets'
                            onClose()
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                {getCategoryName(budget.categoryId)}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {budget.period}
                              </p>
                            </div>
                            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                              {formatCurrency(budget.amount)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Empty State */}
        {!searchTerm.trim() && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <Search className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>Start typing to search...</p>
          </div>
        )}
      </div>
    </Modal>
  )
}

export default SearchModal

