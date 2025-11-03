/**
 * Quick Add Transaction Component
 * 
 * Purpose: Quick form to add transactions from dashboard
 * 
 * Key Concepts Demonstrated:
 * - Form handling with React state
 * - Controlled components
 * - Form validation
 * - Context API usage (useTransactions)
 * 
 * Free Tools Used:
 * - React Hook Form: Could be used but keeping simple for portfolio
 * - useState: Built-in React hook (free)
 * 
 * Usage:
 * <QuickAdd />
 */

'use client'

import { useState } from 'react'
import { useTransactions } from '../../hooks/useTransactions'
import { useBudget } from '../../context/BudgetContext'
import { useToast } from '../ui/Toast'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { TRANSACTION_TYPES } from '../../utils/constants'
import { formatDateForInput } from '../../utils/formatters'

/**
 * Quick add transaction form
 * 
 * Features:
 * - Compact form for quick entry
 * - Category selection
 * - Type toggle (income/expense)
 * - Date picker
 * - Form validation
 */
const QuickAdd = () => {
  // Get transactions and categories from context
  const { addTransaction } = useTransactions()
  const { categories } = useBudget()
  const { showToast } = useToast()

  // Form state
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [type, setType] = useState(TRANSACTION_TYPES.EXPENSE)
  const [date, setDate] = useState(formatDateForInput(new Date()))
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount')
      return
    }

    if (!description.trim()) {
      setError('Please enter a description')
      return
    }

    if (type === TRANSACTION_TYPES.EXPENSE && !categoryId) {
      setError('Please select a category')
      return
    }

    setIsSubmitting(true)

    try {
      // Add transaction via context
      addTransaction({
        amount: parseFloat(amount),
        description: description.trim(),
        categoryId: type === TRANSACTION_TYPES.EXPENSE ? categoryId : null,
        type,
        date: new Date(date).toISOString(),
      })

      // Reset form
      setAmount('')
      setDescription('')
      setCategoryId('')
      setDate(formatDateForInput(new Date()))
      setError('')
      
      // Show success toast
      showToast('Transaction added successfully', 'success', { title: 'Success' })
    } catch (err) {
      const errorMessage = err.message || 'Failed to add transaction. Please try again.'
      setError(errorMessage)
      showToast(errorMessage, 'error', { title: 'Error' })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Filter categories - only show expense categories for expense type
  // Safety check: ensure categories is an array
  const availableCategories =
    type === TRANSACTION_TYPES.EXPENSE
      ? (Array.isArray(categories) ? categories : [])
      : []

  return (
    <div className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200/80 dark:border-gray-600/80 shadow-sm p-4 sm:p-6">
      <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 sm:mb-6">
        Quick Add Transaction
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Type Toggle */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              setType(TRANSACTION_TYPES.INCOME)
              setCategoryId('') // Clear category for income
            }}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
              type === TRANSACTION_TYPES.INCOME
                ? 'bg-success-100 dark:bg-success-500/20 text-success-600 dark:text-success-400 border-2 border-success-300 dark:border-success-500/50'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-transparent dark:border-gray-600'
            }`}
          >
            Income
          </button>
            <button
              type="button"
              onClick={() => setType(TRANSACTION_TYPES.EXPENSE)}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
              type === TRANSACTION_TYPES.EXPENSE
                ? 'bg-error-100 dark:bg-error-500/20 text-error-400 dark:text-error-400 border-2 border-error-300 dark:border-error-500/50'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-transparent dark:border-gray-600'
            }`}
            >
              Expense
            </button>
        </div>

        {/* Amount */}
        <Input
          type="number"
          label="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          step="0.01"
          min="0"
          required
        />

        {/* Description */}
        <Input
          type="text"
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What is this for?"
          required
        />

        {/* Category (only for expenses) */}
        {type === TRANSACTION_TYPES.EXPENSE && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-800 dark:focus:ring-primary-dark focus:border-primary-800 dark:focus:border-primary-dark"
                required
              >
              <option value="">Select a category</option>
              {availableCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Date */}
        <Input
          type="date"
          label="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        {/* Error message */}
        {error && (
          <div className="text-sm text-error-400">{error}</div>
        )}

        {/* Submit button */}
        <Button
          type="submit"
          variant="primary"
          className="w-full"
          loading={isSubmitting}
        >
          Add Transaction
        </Button>
      </form>
    </div>
  )
}

export default QuickAdd

