/**
 * Application Constants
 * 
 * Purpose: Store app-wide constants including default categories, colors, and configuration
 * 
 * Key Concepts Demonstrated:
 * - Constants organization
 * - Default data structure
 * - Color palette definition
 * 
 * Free Tools Used:
 * - Pure JavaScript objects - no external libraries needed
 * - Free color palette - no premium themes
 */

/**
 * Default categories for the budget tracker
 * These are pre-populated to help users get started quickly
 * All icons are from Lucide React (free, open-source)
 */
export const DEFAULT_CATEGORIES = [
  {
    id: 'cat-food',
    name: 'Food & Dining',
    color: '#EF4444', // Red
    icon: 'UtensilsCrossed',
  },
  {
    id: 'cat-transport',
    name: 'Transportation',
    color: '#3B82F6', // Blue
    icon: 'Car',
  },
  {
    id: 'cat-shopping',
    name: 'Shopping',
    color: '#8B5CF6', // Purple
    icon: 'ShoppingBag',
  },
  {
    id: 'cat-entertainment',
    name: 'Entertainment',
    color: '#EC4899', // Pink
    icon: 'Film',
  },
  {
    id: 'cat-bills',
    name: 'Bills & Utilities',
    color: '#10B981', // Green
    icon: 'Receipt',
  },
  {
    id: 'cat-health',
    name: 'Health & Fitness',
    color: '#F59E0B', // Amber
    icon: 'Heart',
  },
  {
    id: 'cat-education',
    name: 'Education',
    color: '#06B6D4', // Cyan
    icon: 'GraduationCap',
  },
  {
    id: 'cat-other',
    name: 'Other',
    color: '#6B7280', // Gray
    icon: 'MoreHorizontal',
  },
]

/**
 * Preset color palette for categories
 * These are free colors that users can choose from when creating categories
 * All colors are in hex format for easy use with TailwindCSS
 */
export const CATEGORY_COLORS = [
  '#EF4444', // Red
  '#F59E0B', // Amber
  '#10B981', // Green
  '#06B6D4', // Cyan
  '#3B82F6', // Blue
  '#6366F1', // Indigo
  '#8B5CF6', // Purple
  '#EC4899', // Pink
  '#F97316', // Orange
  '#84CC16', // Lime
  '#14B8A6', // Teal
  '#6B7280', // Gray
]

/**
 * Transaction types
 * Income: Money coming in
 * Expense: Money going out
 */
export const TRANSACTION_TYPES = {
  INCOME: 'income',
  EXPENSE: 'expense',
}

/**
 * Budget periods
 * Monthly: Budget resets every month
 * Weekly: Budget resets every week
 */
export const BUDGET_PERIODS = {
  MONTHLY: 'monthly',
  WEEKLY: 'weekly',
}

/**
 * LocalStorage keys
 * These are the keys used to store data in localStorage (free browser storage)
 */
export const STORAGE_KEYS = {
  TRANSACTIONS: 'budget_tracker_transactions',
  CATEGORIES: 'budget_tracker_categories',
  BUDGETS: 'budget_tracker_budgets',
}

/**
 * Default currency settings
 * Using USD as default, but can be changed in settings
 * Currency formatting uses Intl.NumberFormat (free, native browser API)
 */
export const DEFAULT_CURRENCY = 'USD'

/**
 * Date format options
 * Using date-fns format strings (free library)
 */
export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy', // Jan 15, 2024
  SHORT: 'MMM dd', // Jan 15
  INPUT: 'yyyy-MM-dd', // 2024-01-15 (for date inputs)
  MONTH_YEAR: 'MMMM yyyy', // January 2024
}

