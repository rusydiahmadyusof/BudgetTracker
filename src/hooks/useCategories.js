/**
 * useCategories Custom Hook
 * 
 * Purpose: Wrapper hook for category operations
 * 
 * Key Concepts Demonstrated:
 * - Custom hooks pattern
 * - Context API usage
 * - Hook composition
 * 
 * Free Tools Used:
 * - React Context API: Built-in React feature (free)
 * - Custom hooks: React pattern (free)
 * 
 * This hook will be completed in Step 4 when BudgetContext is created
 * It provides a clean interface for components to work with categories
 */

import { useContext } from 'react'
import { BudgetContext } from '../context/BudgetContext'

/**
 * Custom hook to access category operations
 * 
 * @returns {Object} - Category operations and data
 * 
 * Usage:
 * const { categories, addCategory, updateCategory, deleteCategory } = useCategories()
 * 
 * This hook wraps the BudgetContext to provide:
 * - Easy access to categories
 * - Category CRUD operations
 * - Cleaner component code
 */
export const useCategories = () => {
  const context = useContext(BudgetContext)
  
  if (!context) {
    throw new Error('useCategories must be used within BudgetProvider')
  }
  
  return {
    categories: context.categories,
    addCategory: context.addCategory,
    updateCategory: context.updateCategory,
    deleteCategory: context.deleteCategory,
  }
}

