/**
 * Category Manager Component
 * 
 * Purpose: Manage categories (list, add, edit, delete)
 * 
 * Key Concepts Demonstrated:
 * - CRUD operations
 * - Array filtering
 * - Conditional rendering
 * - Empty state handling
 * 
 * Free Tools Used:
 * - useCategories: Free custom hook
 * - useTransactions: Free custom hook
 * 
 * Usage:
 * <CategoryManager />
 */

'use client'

import { useState, useMemo } from 'react'
import { useCategories } from '../../hooks/useCategories'
import { useTransactions } from '../../hooks/useTransactions'
import { useToast } from '../ui/Toast'
import { confirmDialog } from '../ui/ConfirmDialog'
import CategoryCard from './CategoryCard'
import CategoryForm from './CategoryForm'
import EmptyState from '../shared/EmptyState'
import { Tag } from 'lucide-react'

/**
 * Category manager component
 * 
 * Features:
 * - Display all categories
 * - Add new category
 * - Edit category
 * - Delete category (with validation)
 * - Show transaction count per category
 */
const CategoryManager = () => {
  const { categories, addCategory, updateCategory, deleteCategory } =
    useCategories()
  const { transactions } = useTransactions()
  const { showToast } = useToast()

  // Form state
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)

  // Calculate transaction count per category
  // useMemo optimizes this calculation (only runs when dependencies change)
  const categoryTransactionCounts = useMemo(() => {
    const counts = {}
    // Safety check: ensure transactions is an array
    if (Array.isArray(transactions)) {
      transactions.forEach((transaction) => {
        if (transaction && transaction.categoryId) {
          counts[transaction.categoryId] =
            (counts[transaction.categoryId] || 0) + 1
        }
      })
    }
    return counts
  }, [transactions])

  // Handle add category
  const handleAdd = () => {
    setEditingCategory(null)
    setIsFormOpen(true)
  }

  // Handle edit category
  const handleEdit = (category) => {
    setEditingCategory(category)
    setIsFormOpen(true)
  }

  // Handle save (add or update)
  const handleSave = async (categoryData) => {
    try {
      if (editingCategory) {
        // Update existing category
        updateCategory(editingCategory.id, categoryData)
        showToast('Category updated successfully', 'success', { title: 'Success' })
      } else {
        // Add new category
        addCategory(categoryData)
        showToast('Category created successfully', 'success', { title: 'Success' })
      }
    } catch (error) {
      showToast(error.message || 'Failed to save category', 'error', { title: 'Error' })
    }
  }

  // Handle delete
  const handleDelete = async (categoryId) => {
    const transactionCount = categoryTransactionCounts[categoryId] || 0

    if (transactionCount > 0) {
      showToast(
        `Cannot delete category. It has ${transactionCount} ${transactionCount === 1 ? 'transaction' : 'transactions'}.`,
        'error',
        { title: 'Cannot Delete' }
      )
      return
    }

    // Confirm before deleting
    const confirmed = await confirmDialog(
      'Delete Category',
      'Are you sure you want to delete this category? This action cannot be undone.',
      { confirmLabel: 'Delete', cancelLabel: 'Cancel', variant: 'danger' }
    )

    if (confirmed) {
      try {
        deleteCategory(categoryId)
        showToast('Category deleted successfully', 'success', { title: 'Success' })
      } catch (error) {
        showToast(error.message || 'Failed to delete category', 'error', { title: 'Error' })
      }
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header - Enterprise styling */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">Categories</h1>
          <p className="mt-2 text-sm font-medium text-gray-500 dark:text-gray-400">
            Organize your expenses with categories
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="px-4 py-2.5 bg-primary-800 dark:bg-primary-dark text-white rounded-lg font-semibold hover:bg-primary-900 dark:hover:bg-primary-dark/90 focus:outline-none focus:ring-2 focus:ring-primary-800 dark:focus:ring-primary-dark focus:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          Add Category
        </button>
      </div>

      {/* Category Grid */}
      {!Array.isArray(categories) || categories.length === 0 ? (
        <EmptyState
          icon={Tag}
          title="No categories yet"
          message="Create categories to organize your expenses"
          actionLabel="Add Category"
          onAction={handleAdd}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(categories) && categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              transactionCount={categoryTransactionCounts[category.id] || 0}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Category Form Modal */}
      <CategoryForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false)
          setEditingCategory(null)
        }}
        category={editingCategory}
        onSave={handleSave}
      />
    </div>
  )
}

export default CategoryManager

