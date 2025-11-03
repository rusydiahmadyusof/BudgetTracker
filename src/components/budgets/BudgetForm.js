/**
 * Budget Form Component
 * 
 * Purpose: Form to add or edit budgets
 * 
 * Key Concepts Demonstrated:
 * - Form handling
 * - Category selection
 * - Period selection
 * - Form validation
 * 
 * Free Tools Used:
 * - Modal: Free custom component
 * - Input: Free custom component
 * 
 * Usage:
 * <BudgetForm
 *   isOpen={isOpen}
 *   onClose={handleClose}
 *   budget={budget} // For edit mode
 *   onSave={handleSave}
 *   categories={categories}
 * />
 */

'use client'

import { useState, useEffect } from 'react'
import { useToast } from '../ui/Toast'
import Modal from '../ui/Modal'
import Input from '../ui/Input'
import Button from '../ui/Button'
import ErrorMessage from '../shared/ErrorMessage'
import { BUDGET_PERIODS } from '../../utils/constants'

/**
 * Budget form modal component
 * 
 * Features:
 * - Category selection
 * - Budget amount input
 * - Period selection (Monthly/Weekly)
 */
const BudgetForm = ({
  isOpen,
  onClose,
  budget = null,
  onSave,
  categories = [],
}) => {
  const { showToast } = useToast()
  const [categoryId, setCategoryId] = useState('')
  const [amount, setAmount] = useState('')
  const [period, setPeriod] = useState(BUDGET_PERIODS.MONTHLY)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Ensure categories is always an array
  const safeCategories = Array.isArray(categories) ? categories : []

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      if (budget) {
        // Edit mode
        setCategoryId(budget.categoryId)
        setAmount(budget.amount.toString())
        setPeriod(budget.period || BUDGET_PERIODS.MONTHLY)
        setError('')
      } else {
        // Add mode
        setCategoryId('')
        setAmount('')
        setPeriod(BUDGET_PERIODS.MONTHLY)
        setError('')
      }
    }
  }, [isOpen, budget])

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!categoryId) {
      setError('Please select a category')
      return
    }

    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid budget amount')
      return
    }

    setIsSubmitting(true)

    try {
      const budgetData = {
        categoryId,
        amount: parseFloat(amount),
        period,
      }

      await onSave(budgetData)
      onClose()
      // Toast notification will be shown by parent component
    } catch (err) {
      const errorMessage = err.message || 'Failed to save budget. Please try again.'
      setError(errorMessage)
      showToast(errorMessage, 'error', { title: 'Error' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={budget ? 'Edit Budget' : 'Set Budget'}
      className="max-w-md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category <span className="text-error-500">*</span>
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-800 dark:focus:ring-primary-dark focus:border-primary-800 dark:focus:border-primary-dark disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed"
                required
                disabled={!!budget} // Can't change category when editing
              >
            <option value="">Select a category</option>
            {safeCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {budget && (
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Category cannot be changed
            </p>
          )}
        </div>

        {/* Budget Amount */}
        <Input
          type="number"
          label="Budget Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          step="0.01"
          min="0"
          required
        />

        {/* Period Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Period
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setPeriod(BUDGET_PERIODS.MONTHLY)}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                period === BUDGET_PERIODS.MONTHLY
                  ? 'bg-primary-100 dark:bg-primary-dark/20 text-primary-800 dark:text-primary-dark border-2 border-primary-300 dark:border-primary-dark/40'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-transparent'
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setPeriod(BUDGET_PERIODS.WEEKLY)}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                period === BUDGET_PERIODS.WEEKLY
                  ? 'bg-primary-100 dark:bg-primary-dark/20 text-primary-800 dark:text-primary-dark border-2 border-primary-300 dark:border-primary-dark/40'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-transparent'
              }`}
            >
              Weekly
            </button>
          </div>
        </div>

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
            {budget ? 'Update' : 'Set'} Budget
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default BudgetForm

