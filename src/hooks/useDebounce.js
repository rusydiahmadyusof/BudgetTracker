/**
 * useDebounce Custom Hook
 * 
 * Purpose: Debounce a value to reduce frequent updates
 * 
 * Key Concepts Demonstrated:
 * - Custom hooks pattern
 * - useEffect cleanup function
 * - setTimeout/clearTimeout usage
 * - Performance optimization
 * 
 * Free Tools Used:
 * - setTimeout: Native JavaScript (free)
 * - React hooks: Built-in React features (free)
 * 
 * Why debounce?
 * - Prevents excessive function calls
 * - Improves performance
 * - Reduces unnecessary re-renders
 * - Common pattern for search inputs
 * 
 * Example: User types in search box
 * Without debounce: Search runs on every keystroke (slow)
 * With debounce: Search runs 300ms after user stops typing (fast)
 */

import { useState, useEffect } from 'react'

/**
 * Debounce a value
 * 
 * @param {any} value - Value to debounce
 * @param {number} delay - Delay in milliseconds (default: 300)
 * @returns {any} - Debounced value
 * 
 * Usage:
 * const [searchTerm, setSearchTerm] = useState('')
 * const debouncedSearchTerm = useDebounce(searchTerm, 300)
 * 
 * The debounced value only updates after the delay period
 * Useful for search inputs, API calls, expensive calculations
 */
export const useDebounce = (value, delay = 300) => {
  // State to hold the debounced value
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // Set a timer to update debouncedValue after delay
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Cleanup function runs when:
    // 1. value changes (before new timer starts)
    // 2. Component unmounts
    // This cancels the previous timer, preventing memory leaks
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay]) // Re-run when value or delay changes

  // Return the debounced value
  // This value only updates after user stops changing the input
  return debouncedValue
}

