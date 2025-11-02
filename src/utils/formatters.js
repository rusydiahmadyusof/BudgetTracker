/**
 * Data Formatting Utilities
 * 
 * Purpose: Format currency, dates, and numbers for display
 * 
 * Key Concepts Demonstrated:
 * - Intl API usage (Internationalization)
 * - Date formatting with date-fns
 * - Number formatting patterns
 * - Currency formatting
 * 
 * Free Tools Used:
 * - Intl.NumberFormat: Native browser API (free, no libraries needed)
 * - date-fns: Free, open-source date utility library
 * - No paid formatting services required
 */

import {
  format,
  parseISO,
  isValid,
  formatDistanceToNow,
  startOfMonth,
  startOfWeek,
  endOfMonth,
  endOfWeek,
} from 'date-fns'

/**
 * Format a number as currency
 * 
 * @param {number} amount - The amount to format
 * @param {string} currency - Currency code (default: 'USD')
 * @returns {string} - Formatted currency string (e.g., "$1,234.56")
 * 
 * Uses Intl.NumberFormat which is:
 * - Free (native browser API)
 * - No external libraries needed
 * - Handles localization automatically
 * - Works in all modern browsers
 */
export const formatCurrency = (amount, currency = 'USD') => {
  // Handle invalid inputs
  if (typeof amount !== 'number' || isNaN(amount)) {
    return '$0.00'
  }

  // Intl.NumberFormat is a free, native browser API
  // It handles currency formatting, thousand separators, and decimal places
  // No need for paid formatting libraries
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

/**
 * Format a number (without currency symbol)
 * 
 * @param {number} number - The number to format
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {string} - Formatted number string (e.g., "1,234.56")
 */
export const formatNumber = (number, decimals = 2) => {
  if (typeof number !== 'number' || isNaN(number)) {
    return '0.00'
  }

  // Using Intl.NumberFormat for number formatting (free API)
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(number)
}

/**
 * Format a date for display
 * 
 * @param {string|Date} date - Date string or Date object
 * @param {string} formatString - Format string (default: 'MMM dd, yyyy')
 * @returns {string} - Formatted date string (e.g., "Jan 15, 2024")
 * 
 * Uses date-fns which is:
 * - Free and open-source
 * - Tree-shakeable (only imports what you use)
 * - No moment.js needed (moment.js is heavy and deprecated)
 */
export const formatDate = (date, formatString = 'MMM dd, yyyy') => {
  // Handle null/undefined
  if (!date) {
    return ''
  }

  try {
    // Parse the date if it's a string
    // date-fns.parseISO handles ISO date strings
    const dateObj = typeof date === 'string' ? parseISO(date) : date

    // Validate the date
    if (!isValid(dateObj)) {
      return ''
    }

    // Format using date-fns (free library)
    return format(dateObj, formatString)
  } catch (error) {
    console.error('Error formatting date:', error)
    return ''
  }
}

/**
 * Format a date as a relative time (e.g., "2 days ago")
 * 
 * @param {string|Date} date - Date string or Date object
 * @returns {string} - Relative time string
 * 
 * This provides a user-friendly way to show when something happened
 * Uses date-fns formatDistanceToNow (free function)
 */
export const formatRelativeDate = (date) => {
  if (!date) {
    return ''
  }

  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date

    if (!isValid(dateObj)) {
      return ''
    }

    // Returns strings like "2 days ago", "in 3 hours", etc.
    return formatDistanceToNow(dateObj, { addSuffix: true })
  } catch (error) {
    console.error('Error formatting relative date:', error)
    return ''
  }
}

/**
 * Format a date for input fields (YYYY-MM-DD)
 * 
 * @param {string|Date} date - Date string or Date object
 * @returns {string} - Formatted date for input (e.g., "2024-01-15")
 * 
 * HTML date inputs require YYYY-MM-DD format
 */
export const formatDateForInput = (date) => {
  if (!date) {
    // Return today's date if no date provided
    return format(new Date(), 'yyyy-MM-dd')
  }

  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date
    if (!isValid(dateObj)) {
      return format(new Date(), 'yyyy-MM-dd')
    }
    return format(dateObj, 'yyyy-MM-dd')
  } catch (error) {
    console.error('Error formatting date for input:', error)
    return format(new Date(), 'yyyy-MM-dd')
  }
}

/**
 * Get the start of a period (month or week)
 * 
 * @param {Date} date - The date
 * @param {string} period - 'month' or 'week'
 * @returns {Date} - Start of the period
 * 
 * Useful for filtering transactions by period
 */
export const getPeriodStart = (date, period = 'month') => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date

  if (period === 'week') {
    return startOfWeek(dateObj, { weekStartsOn: 1 }) // Monday
  }
  return startOfMonth(dateObj)
}

/**
 * Get the end of a period (month or week)
 * 
 * @param {Date} date - The date
 * @param {string} period - 'month' or 'week'
 * @returns {Date} - End of the period
 */
export const getPeriodEnd = (date, period = 'month') => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date

  if (period === 'week') {
    return endOfWeek(dateObj, { weekStartsOn: 1 }) // Monday
  }
  return endOfMonth(dateObj)
}

