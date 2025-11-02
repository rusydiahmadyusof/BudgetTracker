/**
 * useLocalStorage Custom Hook
 * 
 * Purpose: Custom React hook for syncing state with localStorage
 * 
 * Key Concepts Demonstrated:
 * - Custom hooks pattern
 * - useState hook usage
 * - useEffect hook usage
 * - localStorage synchronization
 * - SSR safety (checking for window object)
 * 
 * Free Tools Used:
 * - localStorage: Free browser-native storage (no server costs)
 * - React hooks: Built-in React features (free)
 * 
 * Why a custom hook?
 * - Encapsulates localStorage logic
 * - Provides React state synchronization
 * - Handles SSR safely (Next.js server-side rendering)
 * - Reusable across components
 */

import { useState, useEffect } from 'react'
import { getFromStorage, saveToStorage } from '../utils/storage'

/**
 * Custom hook to sync state with localStorage
 * 
 * @param {string} key - localStorage key
 * @param {any} initialValue - Initial value if key doesn't exist
 * @returns {[any, function]} - [value, setValue] similar to useState
 * 
 * Usage:
 * const [transactions, setTransactions] = useLocalStorage('transactions', [])
 * 
 * This hook:
 * 1. Reads from localStorage on mount
 * 2. Syncs state changes to localStorage
 * 3. Handles SSR safely (returns initialValue on server)
 */
export const useLocalStorage = (key, initialValue) => {
  // State to hold the current value
  // Initialize with initialValue (will be updated from localStorage in useEffect)
  const [storedValue, setStoredValue] = useState(() => {
    // Check if we're in browser (not SSR)
    if (typeof window === 'undefined') {
      return initialValue
    }

    try {
      // Try to get value from localStorage
      const item = getFromStorage(key)
      
      // Return stored value or initialValue if not found
      return item !== null ? item : initialValue
    } catch (error) {
      // If error reading from localStorage, return initialValue
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // Effect to sync state changes to localStorage
  useEffect(() => {
    // Only run in browser (not SSR)
    if (typeof window === 'undefined') {
      return
    }

    try {
      // Save to localStorage whenever storedValue changes
      saveToStorage(key, storedValue)
    } catch (error) {
      // Handle errors silently (storage quota exceeded, etc.)
      console.error(`Error saving to localStorage key "${key}":`, error)
    }
  }, [key, storedValue]) // Re-run when key or storedValue changes

  // Return value and setter function (similar to useState)
  // Components can use this exactly like useState
  return [storedValue, setStoredValue]
}

