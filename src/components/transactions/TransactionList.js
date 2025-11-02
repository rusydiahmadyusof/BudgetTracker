/**
 * Transaction List Component
 * 
 * Purpose: Display and manage list of transactions
 * 
 * Key Concepts Demonstrated:
 * - Array filtering
 * - Array sorting
 * - Conditional rendering
 * - Empty state handling
 * - Search and filter logic
 * 
 * Free Tools Used:
 * - Array methods: Native JavaScript (free)
 * - date-fns: Free date utilities
 * 
 * Usage:
 * <TransactionList />
 */

'use client'

import { useState, useMemo } from 'react'
import { useTransactions } from '../../hooks/useTransactions'
import { useBudget } from '../../context/BudgetContext'
import TransactionItem from './TransactionItem'
import TransactionForm from './TransactionForm'
import FilterBar from './FilterBar'
import EmptyState from '../shared/EmptyState'
import { Receipt } from 'lucide-react'
import { TRANSACTION_TYPES } from '../../utils/constants'
import { parseISO, isWithinInterval } from 'date-fns'

/**
 * Transaction list component
 * 
 * Features:
 * - Display all transactions
 * - Search functionality
 * - Filter by category, type, date range
 * - Add/Edit/Delete transactions
 * - Sort by date (newest first)
 */
const TransactionList = () => {
  const { transactions, addTransaction, updateTransaction, deleteTransaction } =
    useTransactions()
  const { categories } = useBudget()

  // Filter state
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  // Form state
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState(null)

  // Debounced search term (handled by FilterBar)
  const debouncedSearchTerm = searchTerm.toLowerCase().trim()

  // Filter and sort transactions
  // useMemo ensures filtering only runs when dependencies change (performance optimization)
  const filteredTransactions = useMemo(() => {
    let filtered = [...transactions]

    // Filter by search term (description)
    if (debouncedSearchTerm) {
      filtered = filtered.filter((transaction) =>
        transaction.description.toLowerCase().includes(debouncedSearchTerm)
      )
    }

    // Filter by category
    if (categoryFilter) {
      filtered = filtered.filter(
        (transaction) => transaction.categoryId === categoryFilter
      )
    }

    // Filter by type
    if (typeFilter) {
      filtered = filtered.filter((transaction) => transaction.type === typeFilter)
    }

    // Filter by date range
    if (dateFrom || dateTo) {
      filtered = filtered.filter((transaction) => {
        const transactionDate = parseISO(transaction.date)

        if (dateFrom && dateTo) {
          // Both dates provided
          const fromDate = parseISO(dateFrom)
          const toDate = parseISO(dateTo)
          return isWithinInterval(transactionDate, { start: fromDate, end: toDate })
        } else if (dateFrom) {
          // Only from date
          return transactionDate >= parseISO(dateFrom)
        } else if (dateTo) {
          // Only to date
          return transactionDate <= parseISO(dateTo)
        }

        return true
      })
    }

    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date))

    return filtered
  }, [
    transactions,
    debouncedSearchTerm,
    categoryFilter,
    typeFilter,
    dateFrom,
    dateTo,
  ])

  // Get category by ID
  const getCategory = (categoryId) => {
    if (!Array.isArray(categories)) return null
    return categories.find((cat) => cat.id === categoryId)
  }

  // Handle add transaction
  const handleAdd = () => {
    setEditingTransaction(null)
    setIsFormOpen(true)
  }

  // Handle edit transaction
  const handleEdit = (transaction) => {
    setEditingTransaction(transaction)
    setIsFormOpen(true)
  }

  // Handle save (add or update)
  const handleSave = async (transactionData) => {
    if (editingTransaction) {
      // Update existing transaction
      updateTransaction(editingTransaction.id, transactionData)
    } else {
      // Add new transaction
      addTransaction(transactionData)
    }
  }

  // Handle delete
  const handleDelete = (transactionId) => {
    // Confirm before deleting
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(transactionId)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header - Enterprise styling */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">Transactions</h1>
          <p className="mt-2 text-sm font-medium text-gray-500 dark:text-gray-400">
            Manage your income and expenses
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="px-4 py-2.5 bg-primary-800 dark:bg-primary-dark text-white rounded-lg font-semibold hover:bg-primary-900 dark:hover:bg-primary-dark/90 focus:outline-none focus:ring-2 focus:ring-primary-800 dark:focus:ring-primary-dark focus:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          Add Transaction
        </button>
      </div>

      {/* Filter Bar */}
      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
        typeFilter={typeFilter}
        onTypeChange={setTypeFilter}
        dateFrom={dateFrom}
        onDateFromChange={setDateFrom}
        dateTo={dateTo}
        onDateToChange={setDateTo}
        categories={categories}
      />

      {/* Transaction List */}
      <div className="bg-white rounded-lg border border-gray-200">
        {filteredTransactions.length === 0 ? (
          <EmptyState
            icon={Receipt}
            title={
              transactions.length === 0
                ? 'No transactions yet'
                : 'No transactions match your filters'
            }
            message={
              transactions.length === 0
                ? 'Get started by adding your first transaction'
                : 'Try adjusting your search or filters'
            }
            actionLabel={transactions.length === 0 ? 'Add Transaction' : null}
            onAction={transactions.length === 0 ? handleAdd : null}
          />
        ) : (
          <div className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200/80 dark:border-gray-600/80 shadow-sm divide-y divide-gray-200 dark:divide-gray-600">
            {filteredTransactions.map((transaction) => (
              <TransactionItem
                key={transaction.id}
                transaction={transaction}
                category={getCategory(transaction.categoryId)}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {/* Transaction Form Modal */}
      <TransactionForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false)
          setEditingTransaction(null)
        }}
        transaction={editingTransaction}
        onSave={handleSave}
        categories={categories}
      />
    </div>
  )
}

export default TransactionList

