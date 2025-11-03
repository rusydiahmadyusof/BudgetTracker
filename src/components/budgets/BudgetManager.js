/**
 * Budget Manager Component
 * 
 * Purpose: Manage budgets (list, add, edit, delete)
 * 
 * Key Concepts Demonstrated:
 * - Budget calculations
 * - Date period filtering
 * - Progress tracking
 * - Empty state handling
 * 
 * Free Tools Used:
 * - useBudget: Free context hook
 * - useTransactions: Free custom hook
 * - calculateCategorySpending: Free utility
 * - date-fns: Free date utilities
 * 
 * Usage:
 * <BudgetManager />
 */

'use client'

import { useState, useMemo } from 'react'
import { useBudget } from '../../context/BudgetContext'
import { useTransactions } from '../../hooks/useTransactions'
import { useToast } from '../ui/Toast'
import { confirmDialog } from '../ui/ConfirmDialog'
import { calculateCategorySpending } from '../../utils/calculations'
import BudgetCard from './BudgetCard'
import BudgetForm from './BudgetForm'
import EmptyState from '../shared/EmptyState'
import { Target } from 'lucide-react'
import { getPeriodStart, getPeriodEnd } from '../../utils/formatters'

/**
 * Budget manager component
 * 
 * Features:
 * - Display all budgets
 * - Show spending vs budget
 * - Progress indicators
 * - Add/Edit/Delete budgets
 */
const BudgetManager = () => {
  const { budgets, setBudget, deleteBudget, categories } = useBudget()
  const { transactions } = useTransactions()
  const { showToast } = useToast()

  // Form state
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingBudget, setEditingBudget] = useState(null)

  // Calculate spending for each budget
  // useMemo optimizes this calculation
  const budgetSpending = useMemo(() => {
    const spending = {}
    const now = new Date()

    budgets.forEach((budget) => {
      // Get period start and end dates
      const periodStart = getPeriodStart(now, budget.period)
      const periodEnd = getPeriodEnd(now, budget.period)

      // Calculate spending for this category in this period
      const spent = calculateCategorySpending(
        transactions,
        budget.categoryId,
        periodStart,
        periodEnd
      )

      spending[budget.id] = spent
    })

    return spending
  }, [budgets, transactions])

  // Handle add budget
  const handleAdd = () => {
    setEditingBudget(null)
    setIsFormOpen(true)
  }

  // Handle edit budget
  const handleEdit = (budget) => {
    setEditingBudget(budget)
    setIsFormOpen(true)
  }

  // Handle save (add or update)
  const handleSave = async (budgetData) => {
    try {
      // Include budget ID when editing
      const budgetToSave = editingBudget
        ? { ...budgetData, id: editingBudget.id }
        : budgetData
      
      setBudget(budgetToSave)
      if (editingBudget) {
        showToast('Budget updated successfully', 'success', { title: 'Success' })
      } else {
        showToast('Budget created successfully', 'success', { title: 'Success' })
      }
    } catch (error) {
      showToast(error.message || 'Failed to save budget', 'error', { title: 'Error' })
    }
  }

  // Handle delete
  const handleDelete = async (budgetId) => {
    const confirmed = await confirmDialog(
      'Delete Budget',
      'Are you sure you want to delete this budget? This action cannot be undone.',
      { confirmLabel: 'Delete', cancelLabel: 'Cancel', variant: 'danger' }
    )

    if (confirmed) {
      try {
        deleteBudget(budgetId)
        showToast('Budget deleted successfully', 'success', { title: 'Success' })
      } catch (error) {
        showToast(error.message || 'Failed to delete budget', 'error', { title: 'Error' })
      }
    }
  }

  // Get category by ID
  const getCategory = (categoryId) => {
    if (!Array.isArray(categories)) return null
    return categories.find((cat) => cat.id === categoryId)
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
      {/* Page Header - Enterprise styling */}
      <div className="mb-4 sm:mb-6 lg:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">Budgets</h1>
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
            Set and track your spending limits
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="px-3 sm:px-4 py-2 sm:py-2.5 bg-primary-800 text-sm sm:text-base w-full sm:w-auto touch-manipulation dark:bg-primary-dark text-white rounded-lg font-semibold hover:bg-primary-900 dark:hover:bg-primary-dark/90 focus:outline-none focus:ring-2 focus:ring-primary-800 dark:focus:ring-primary-dark focus:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          Set Budget
        </button>
      </div>

      {/* Budget Grid */}
      {budgets.length === 0 ? (
        <EmptyState
          icon={Target}
          title="No budgets set"
          message="Set budgets to track your spending and stay on track"
          actionLabel="Set Budget"
          onAction={handleAdd}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {budgets.map((budget) => {
            const category = getCategory(budget.categoryId)
            const spent = budgetSpending[budget.id] || 0

            return (
              <BudgetCard
                key={budget.id}
                budget={budget}
                category={category}
                spent={spent}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )
          })}
        </div>
      )}

      {/* Budget Form Modal */}
      <BudgetForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false)
          setEditingBudget(null)
        }}
        budget={editingBudget}
        onSave={handleSave}
        categories={categories}
      />
    </div>
  )
}

export default BudgetManager

