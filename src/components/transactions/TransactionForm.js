/**
 * Transaction Form Component
 * 
 * Purpose: Form to add or edit transactions
 * 
 * Key Concepts Demonstrated:
 * - Form handling
 * - Controlled components
 * - Form validation
 * - Modal integration
 * - Edit vs Add mode
 * 
 * Free Tools Used:
 * - useState: Built-in React hook
 * - Modal component: Free, custom component
 * 
 * Usage:
 * <TransactionForm
 *   isOpen={isOpen}
 *   onClose={handleClose}
 *   transaction={transaction} // For edit mode, null for add mode
 *   onSave={handleSave}
 * />
 */

'use client'

import { useState, useEffect } from 'react'
import Modal from '../ui/Modal'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { TRANSACTION_TYPES } from '../../utils/constants'
import { formatDateForInput } from '../../utils/formatters'

/**
 * Transaction form modal component
 * 
 * Features:
 * - Add new transaction
 * - Edit existing transaction
 * - Form validation
 * - Category selection (for expenses)
 * - Type toggle (income/expense)
 */
const TransactionForm = ({
  isOpen,
  onClose,
  transaction = null, // null for add mode, transaction object for edit mode
  onSave,
  categories,
}) => {
  // Form state
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [type, setType] = useState(TRANSACTION_TYPES.EXPENSE)
  const [date, setDate] = useState(formatDateForInput(new Date()))
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Reset form when modal opens/closes or transaction changes
  useEffect(() => {
    if (isOpen) {
      if (transaction) {
        // Edit mode: populate form with transaction data
        setAmount(transaction.amount.toString())
        setDescription(transaction.description)
        setCategoryId(transaction.categoryId || '')
        setType(transaction.type)
        setDate(formatDateForInput(transaction.date))
        setError('')
      } else {
        // Add mode: reset to defaults
        setAmount('')
        setDescription('')
        setCategoryId('')
        setType(TRANSACTION_TYPES.EXPENSE)
        setDate(formatDateForInput(new Date()))
        setError('')
      }
    }
  }, [isOpen, transaction])

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
      // Prepare transaction data
      const transactionData = {
        amount: parseFloat(amount),
        description: description.trim(),
        categoryId: type === TRANSACTION_TYPES.EXPENSE ? categoryId : null,
        type,
        date: new Date(date).toISOString(),
      }

      // Call save handler (parent component handles add/update)
      await onSave(transactionData)

      // Close modal on success
      onClose()
    } catch (err) {
      setError(err.message || 'Failed to save transaction. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Get available categories (only for expenses)
  // Safety check: ensure categories is an array
  const availableCategories =
    type === TRANSACTION_TYPES.EXPENSE
      ? (Array.isArray(categories) ? categories : [])
      : []

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={transaction ? 'Edit Transaction' : 'Add Transaction'}
      className="max-w-md"
    >
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
              Category <span className="text-error-500">*</span>
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
          <div className="text-sm text-error-400 bg-error-50 p-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Form Actions */}
        <div className="flex items-center justify-end space-x-3 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary" loading={isSubmitting}>
            {transaction ? 'Update' : 'Add'} Transaction
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default TransactionForm

