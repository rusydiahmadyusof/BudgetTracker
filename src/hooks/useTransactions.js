/**
 * useTransactions Custom Hook
 * 
 * Purpose: Wrapper hook for transaction operations
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
 * It provides a clean interface for components to work with transactions
 */

import { useContext } from 'react'
import { BudgetContext } from '../context/BudgetContext'

/**
 * Custom hook to access transaction operations
 * 
 * @returns {Object} - Transaction operations and data
 * 
 * Usage:
 * const { transactions, addTransaction, updateTransaction, deleteTransaction } = useTransactions()
 * 
 * This hook wraps the BudgetContext to provide:
 * - Easy access to transactions
 * - Transaction CRUD operations
 * - Cleaner component code
 */
export const useTransactions = () => {
  const context = useContext(BudgetContext)
  
  if (!context) {
    throw new Error('useTransactions must be used within BudgetProvider')
  }
  
  return {
    transactions: context.transactions,
    addTransaction: context.addTransaction,
    updateTransaction: context.updateTransaction,
    deleteTransaction: context.deleteTransaction,
  }
}

