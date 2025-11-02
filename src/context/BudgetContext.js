/**
 * Budget Context - Global State Management
 * 
 * Purpose: Provide global state management for transactions, categories, and budgets
 * 
 * Key Concepts Demonstrated:
 * - React Context API
 * - Context Provider pattern
 * - Global state management
 * - localStorage persistence
 * - CRUD operations
 * - Error handling
 * 
 * Free Tools Used:
 * - React Context API: Built-in React feature (free, no Redux needed)
 * - localStorage: Free browser storage (no backend costs)
 * - Custom hooks: React pattern (free)
 * 
 * Why Context API?
 * - Avoids prop drilling (passing props through many components)
 * - Free alternative to Redux (no additional library needed)
 * - Perfect for this app's scale
 * - Simpler than Redux for small-medium apps
 */

'use client' // Next.js directive: This is a client component (uses hooks)

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { 
  getFromStorage, 
  saveToStorage 
} from '../utils/storage'
import { 
  STORAGE_KEYS, 
  DEFAULT_CATEGORIES 
} from '../utils/constants'

/**
 * Create the BudgetContext
 * This will hold the state and functions for the entire app
 * Components can access this via useContext(BudgetContext)
 */
export const BudgetContext = createContext(undefined)

/**
 * BudgetProvider Component
 * 
 * Purpose: Wrap the app with this provider to enable global state access
 * 
 * This component:
 * - Manages all state (transactions, categories, budgets)
 * - Provides CRUD operations
 * - Syncs with localStorage (free storage)
 * - Handles initial data loading
 */
export const BudgetProvider = ({ children }) => {
  // State for transactions
  // Each transaction: { id, amount, description, categoryId, date, type: 'income'|'expense' }
  const [transactions, setTransactions] = useState([])

  // State for categories
  // Each category: { id, name, color, icon }
  const [categories, setCategories] = useState([])

  // State for budgets
  // Each budget: { id, categoryId, amount, period: 'monthly'|'weekly' }
  const [budgets, setBudgets] = useState([])

  /**
   * Load initial data from localStorage
   * Runs once when component mounts (client-side only)
   * localStorage is synchronous, so we can initialize state directly
   */
  useEffect(() => {
    // Check if we're in browser (client-side)
    if (typeof window === 'undefined') {
      // SSR: Initialize with defaults
      setCategories(DEFAULT_CATEGORIES)
      setTransactions([])
      setBudgets([])
      return
    }

    try {
      // Load transactions from localStorage
      const savedTransactions = getFromStorage(STORAGE_KEYS.TRANSACTIONS)
      setTransactions(Array.isArray(savedTransactions) ? savedTransactions : [])

      // Load categories from localStorage
      // If no categories exist, use default categories
      const savedCategories = getFromStorage(STORAGE_KEYS.CATEGORIES)
      if (Array.isArray(savedCategories) && savedCategories.length > 0) {
        setCategories(savedCategories)
      } else {
        // Initialize with default categories (free, pre-defined)
        setCategories(DEFAULT_CATEGORIES)
        // Save defaults to localStorage
        saveToStorage(STORAGE_KEYS.CATEGORIES, DEFAULT_CATEGORIES)
      }

      // Load budgets from localStorage
      const savedBudgets = getFromStorage(STORAGE_KEYS.BUDGETS)
      setBudgets(Array.isArray(savedBudgets) ? savedBudgets : [])
    } catch (error) {
      // If there's an error loading data, initialize with defaults
      console.error('Error loading data from localStorage:', error)
      setCategories(DEFAULT_CATEGORIES)
      setTransactions([])
      setBudgets([])
    }
  }, []) // Empty dependency array = run once on mount

  /**
   * Save transactions to localStorage whenever they change
   * This keeps data persisted across page refreshes (free storage)
   */
  useEffect(() => {
    // Only save if we're in browser and have data
    if (typeof window !== 'undefined' && transactions.length >= 0) {
      saveToStorage(STORAGE_KEYS.TRANSACTIONS, transactions)
    }
  }, [transactions])

  /**
   * Save categories to localStorage whenever they change
   */
  useEffect(() => {
    // Only save if we're in browser and have categories
    if (typeof window !== 'undefined' && categories.length > 0) {
      saveToStorage(STORAGE_KEYS.CATEGORIES, categories)
    }
  }, [categories])

  /**
   * Save budgets to localStorage whenever they change
   */
  useEffect(() => {
    // Only save if we're in browser
    if (typeof window !== 'undefined') {
      saveToStorage(STORAGE_KEYS.BUDGETS, budgets)
    }
  }, [budgets])

  /**
   * Add a new transaction
   * 
   * @param {Object} transaction - Transaction object
   * @returns {string} - ID of created transaction
   */
  const addTransaction = useCallback((transaction) => {
    // Generate unique ID (using timestamp + random for uniqueness)
    const id = `trans_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    // Create new transaction with ID and current date if not provided
    const newTransaction = {
      ...transaction,
      id,
      date: transaction.date || new Date().toISOString(),
    }

    // Add to state (React will trigger re-render)
    setTransactions((prev) => [...prev, newTransaction])
    
    return id
  }, [])

  /**
   * Update an existing transaction
   * 
   * @param {string} id - Transaction ID
   * @param {Object} updates - Fields to update
   */
  const updateTransaction = useCallback((id, updates) => {
    setTransactions((prev) =>
      prev.map((transaction) =>
        transaction.id === id ? { ...transaction, ...updates } : transaction
      )
    )
  }, [])

  /**
   * Delete a transaction
   * 
   * @param {string} id - Transaction ID to delete
   */
  const deleteTransaction = useCallback((id) => {
    setTransactions((prev) => prev.filter((transaction) => transaction.id !== id))
  }, [])

  /**
   * Add a new category
   * 
   * @param {Object} category - Category object
   * @returns {string} - ID of created category
   */
  const addCategory = useCallback((category) => {
    const id = `cat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const newCategory = {
      ...category,
      id,
    }

    setCategories((prev) => [...prev, newCategory])
    return id
  }, [])

  /**
   * Update an existing category
   * 
   * @param {string} id - Category ID
   * @param {Object} updates - Fields to update
   */
  const updateCategory = useCallback((id, updates) => {
    setCategories((prev) =>
      prev.map((category) =>
        category.id === id ? { ...category, ...updates } : category
      )
    )
  }, [])

  /**
   * Delete a category
   * 
   * @param {string} id - Category ID to delete
   */
  const deleteCategory = useCallback((id) => {
    // Prevent deleting category if it has transactions
    const hasTransactions = transactions.some(
      (transaction) => transaction.categoryId === id
    )

    if (hasTransactions) {
      throw new Error('Cannot delete category with existing transactions')
    }

    setCategories((prev) => prev.filter((category) => category.id !== id))
    
    // Also delete any budgets for this category
    setBudgets((prev) => prev.filter((budget) => budget.categoryId !== id))
  }, [transactions])

  /**
   * Add or update a budget
   * 
   * @param {Object} budget - Budget object
   * @returns {string} - ID of created/updated budget
   */
  const setBudget = useCallback((budget) => {
    // Check if budget already exists for this category and period
    const existingBudget = budgets.find(
      (b) => b.categoryId === budget.categoryId && b.period === budget.period
    )

    if (existingBudget) {
      // Update existing budget
      setBudgets((prev) =>
        prev.map((b) =>
          b.id === existingBudget.id ? { ...b, ...budget, id: existingBudget.id } : b
        )
      )
      return existingBudget.id
    } else {
      // Create new budget
      const id = `budget_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      const newBudget = {
        ...budget,
        id,
      }

      setBudgets((prev) => [...prev, newBudget])
      return id
    }
  }, [budgets])

  /**
   * Delete a budget
   * 
   * @param {string} id - Budget ID to delete
   */
  const deleteBudget = useCallback((id) => {
    setBudgets((prev) => prev.filter((budget) => budget.id !== id))
  }, [])

  // Value object to provide to consumers
  // This is what components will access via useContext
  const value = {
    // State
    transactions,
    categories,
    budgets,

    // Transaction operations
    addTransaction,
    updateTransaction,
    deleteTransaction,

    // Category operations
    addCategory,
    updateCategory,
    deleteCategory,

    // Budget operations
    setBudget,
    deleteBudget,
  }

  // Provide the value to all child components
  return <BudgetContext.Provider value={value}>{children}</BudgetContext.Provider>
}

/**
 * Custom hook to use BudgetContext
 * 
 * Usage: const { transactions, addTransaction } = useBudget()
 * 
 * This hook:
 * - Ensures context is used within provider
 * - Throws helpful error if used outside provider
 * - Provides cleaner API than useContext(BudgetContext)
 */
export const useBudget = () => {
  const context = useContext(BudgetContext)

  if (context === undefined) {
    throw new Error('useBudget must be used within a BudgetProvider')
  }

  return context
}

