/**
 * Calculation Utilities
 * 
 * Purpose: Business logic calculations for budget tracking
 * 
 * Key Concepts Demonstrated:
 * - Array methods (reduce, filter, map)
 * - Mathematical calculations
 * - Date comparisons
 * - Data aggregation
 * 
 * Free Tools Used:
 * - Pure JavaScript - no calculation libraries needed
 * - date-fns for date comparisons (free library)
 * 
 * All calculations are done client-side (free, no server costs)
 */

import { isWithinInterval, parseISO } from 'date-fns'

/**
 * Calculate total income from transactions
 * 
 * @param {Array} transactions - Array of transaction objects
 * @param {Date} startDate - Optional start date filter
 * @param {Date} endDate - Optional end date filter
 * @returns {number} - Total income amount
 * 
 * Uses Array.reduce to sum up all income transactions
 * This is a common pattern for aggregating data
 */
export const calculateTotalIncome = (transactions, startDate = null, endDate = null) => {
  // Safety check: ensure transactions is an array
  if (!Array.isArray(transactions) || transactions.length === 0) {
    return 0
  }

  // Filter transactions by type and date range
  let filteredTransactions = transactions.filter((transaction) => {
    // Only include income transactions
    if (transaction.type !== 'income') {
      return false
    }

    // Filter by date range if provided
    if (startDate && endDate) {
      const transactionDate = typeof transaction.date === 'string' 
        ? parseISO(transaction.date) 
        : transaction.date
      
      return isWithinInterval(transactionDate, {
        start: startDate,
        end: endDate,
      })
    }

    return true
  })

  // Sum all amounts using reduce
  // reduce accumulates a total by adding each transaction amount
  return filteredTransactions.reduce((total, transaction) => {
    return total + (parseFloat(transaction.amount) || 0)
  }, 0)
}

/**
 * Calculate total expenses from transactions
 * 
 * @param {Array} transactions - Array of transaction objects
 * @param {Date} startDate - Optional start date filter
 * @param {Date} endDate - Optional end date filter
 * @returns {number} - Total expense amount
 */
export const calculateTotalExpenses = (transactions, startDate = null, endDate = null) => {
  // Safety check: ensure transactions is an array
  if (!Array.isArray(transactions) || transactions.length === 0) {
    return 0
  }

  // Filter transactions by type and date range
  let filteredTransactions = transactions.filter((transaction) => {
    // Only include expense transactions
    if (transaction.type !== 'expense') {
      return false
    }

    // Filter by date range if provided
    if (startDate && endDate) {
      const transactionDate = typeof transaction.date === 'string' 
        ? parseISO(transaction.date) 
        : transaction.date
      
      return isWithinInterval(transactionDate, {
        start: startDate,
        end: endDate,
      })
    }

    return true
  })

  // Sum all amounts
  return filteredTransactions.reduce((total, transaction) => {
    return total + (parseFloat(transaction.amount) || 0)
  }, 0)
}

/**
 * Calculate net balance (income - expenses)
 * 
 * @param {Array} transactions - Array of transaction objects
 * @param {Date} startDate - Optional start date filter
 * @param {Date} endDate - Optional end date filter
 * @returns {number} - Net balance
 */
export const calculateBalance = (transactions, startDate = null, endDate = null) => {
  const income = calculateTotalIncome(transactions, startDate, endDate)
  const expenses = calculateTotalExpenses(transactions, startDate, endDate)
  return income - expenses
}

/**
 * Calculate total spent for a specific category
 * 
 * @param {Array} transactions - Array of transaction objects
 * @param {string} categoryId - Category ID to filter by
 * @param {Date} startDate - Optional start date filter
 * @param {Date} endDate - Optional end date filter
 * @returns {number} - Total spent in category
 */
export const calculateCategorySpending = (transactions, categoryId, startDate = null, endDate = null) => {
  // Safety check: ensure transactions is an array
  if (!Array.isArray(transactions) || transactions.length === 0) {
    return 0
  }

  // Filter by category and date range
  let filteredTransactions = transactions.filter((transaction) => {
    // Only expense transactions have categories
    if (transaction.type !== 'expense') {
      return false
    }

    // Match category
    if (transaction.categoryId !== categoryId) {
      return false
    }

    // Filter by date range if provided
    if (startDate && endDate) {
      const transactionDate = typeof transaction.date === 'string' 
        ? parseISO(transaction.date) 
        : transaction.date
      
      return isWithinInterval(transactionDate, {
        start: startDate,
        end: endDate,
      })
    }

    return true
  })

  // Sum amounts
  return filteredTransactions.reduce((total, transaction) => {
    return total + (parseFloat(transaction.amount) || 0)
  }, 0)
}

/**
 * Calculate budget progress percentage
 * 
 * @param {number} spent - Amount spent
 * @param {number} budget - Budget amount
 * @returns {number} - Percentage (0-100+)
 * 
 * Returns percentage, can exceed 100% if over budget
 */
export const calculateBudgetProgress = (spent, budget) => {
  if (!budget || budget === 0) {
    return 0
  }

  // Calculate percentage: (spent / budget) * 100
  // Can be over 100% if user exceeded budget
  return Math.round((spent / budget) * 100)
}

/**
 * Get spending breakdown by category
 * 
 * @param {Array} transactions - Array of transaction objects
 * @param {Array} categories - Array of category objects
 * @param {Date} startDate - Optional start date filter
 * @param {Date} endDate - Optional end date filter
 * @returns {Array} - Array of { categoryId, categoryName, amount, percentage }
 * 
 * Useful for charts and visualizations
 */
export const getCategoryBreakdown = (transactions, categories, startDate = null, endDate = null) => {
  // Safety check: ensure transactions and categories are arrays
  if (!Array.isArray(transactions) || transactions.length === 0) {
    return []
  }
  
  if (!Array.isArray(categories)) {
    return []
  }

  // Calculate total expenses first
  const totalExpenses = calculateTotalExpenses(transactions, startDate, endDate)

  if (totalExpenses === 0) {
    return []
  }

  // Group expenses by category
  const categoryMap = {}

  transactions.forEach((transaction) => {
    // Only process expense transactions
    if (transaction.type !== 'expense') {
      return
    }

    // Filter by date range if provided
    if (startDate && endDate) {
      const transactionDate = typeof transaction.date === 'string' 
        ? parseISO(transaction.date) 
        : transaction.date
      
      if (!isWithinInterval(transactionDate, { start: startDate, end: endDate })) {
        return
      }
    }

    const categoryId = transaction.categoryId
    const amount = parseFloat(transaction.amount) || 0

    // Initialize category if not exists
    if (!categoryMap[categoryId]) {
      categoryMap[categoryId] = {
        categoryId,
        amount: 0,
      }
    }

    // Add to category total
    categoryMap[categoryId].amount += amount
  })

  // Convert map to array and add category info
  const breakdown = Object.values(categoryMap).map((item) => {
    const category = categories.find((cat) => cat.id === item.categoryId)
    const percentage = totalExpenses > 0 
      ? Math.round((item.amount / totalExpenses) * 100) 
      : 0

    return {
      categoryId: item.categoryId,
      categoryName: category?.name || 'Unknown',
      categoryColor: category?.color || '#6B7280',
      amount: item.amount,
      percentage,
    }
  })

  // Sort by amount (descending)
  return breakdown.sort((a, b) => b.amount - a.amount)
}

