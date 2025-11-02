/**
 * LocalStorage Utility Functions
 * 
 * Purpose: Provide a safe wrapper around localStorage operations with error handling
 * 
 * Key Concepts Demonstrated:
 * - localStorage API usage
 * - Error handling patterns
 * - JSON serialization/deserialization
 * - Try-catch error handling
 * 
 * Free Tools Used:
 * - localStorage: Free browser-native storage API (no server costs)
 * - JSON.parse/JSON.stringify: Native JavaScript (no libraries needed)
 * 
 * Why localStorage?
 * - Completely free - no backend server needed
 * - No database costs
 * - No API keys required
 * - Data persists across browser sessions
 * - Perfect for portfolio projects and personal use
 */

/**
 * Get data from localStorage
 * 
 * @param {string} key - The storage key
 * @returns {any|null} - The parsed data or null if not found/error
 * 
 * This function safely retrieves data from localStorage
 * Wraps JSON.parse in try-catch to handle corrupted data gracefully
 */
export const getFromStorage = (key) => {
  // Check if we're in a browser environment
  // localStorage is not available in Node.js/SSR context
  if (typeof window === 'undefined') {
    return null
  }

  try {
    // Get the raw string from localStorage
    const item = window.localStorage.getItem(key)
    
    // If no item exists, return null
    if (item === null) {
      return null
    }

    // Parse the JSON string back to JavaScript object/array
    // JSON.parse can throw if the data is corrupted
    return JSON.parse(item)
  } catch (error) {
    // If parsing fails (corrupted data), log error and return null
    // This prevents the app from crashing due to bad localStorage data
    console.error(`Error reading from localStorage key "${key}":`, error)
    return null
  }
}

/**
 * Save data to localStorage
 * 
 * @param {string} key - The storage key
 * @param {any} value - The data to store (will be JSON.stringify'd)
 * @returns {boolean} - True if successful, false otherwise
 * 
 * This function safely saves data to localStorage
 * Handles quota exceeded errors (localStorage has ~5-10MB limit)
 */
export const saveToStorage = (key, value) => {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    return false
  }

  try {
    // Convert JavaScript object/array to JSON string
    // JSON.stringify handles circular references and can throw
    const serializedValue = JSON.stringify(value)
    
    // Save to localStorage
    // Can throw if storage quota is exceeded
    window.localStorage.setItem(key, serializedValue)
    return true
  } catch (error) {
    // Handle quota exceeded or other storage errors
    if (error.name === 'QuotaExceededError') {
      console.error('localStorage quota exceeded. Data not saved.')
    } else {
      console.error(`Error saving to localStorage key "${key}":`, error)
    }
    return false
  }
}

/**
 * Remove data from localStorage
 * 
 * @param {string} key - The storage key to remove
 * @returns {boolean} - True if successful, false otherwise
 */
export const removeFromStorage = (key) => {
  if (typeof window === 'undefined') {
    return false
  }

  try {
    window.localStorage.removeItem(key)
    return true
  } catch (error) {
    console.error(`Error removing from localStorage key "${key}":`, error)
    return false
  }
}

/**
 * Clear all localStorage data for this app
 * 
 * @returns {boolean} - True if successful, false otherwise
 * 
 * Note: This only clears our app's keys, not all localStorage
 * For a production app, you might want to clear specific keys only
 */
export const clearStorage = () => {
  if (typeof window === 'undefined') {
    return false
  }

  try {
    window.localStorage.clear()
    return true
  } catch (error) {
    console.error('Error clearing localStorage:', error)
    return false
  }
}

