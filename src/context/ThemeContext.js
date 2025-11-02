/**
 * Theme Context
 * 
 * Purpose: Manage dark/light theme state across the application
 * 
 * Key Concepts Demonstrated:
 * - Context API for global theme state
 * - localStorage persistence
 * - System preference detection
 * - Theme switching logic
 * 
 * Free Tools Used:
 * - React Context API: Built-in React feature (free)
 * - localStorage: Browser-native storage (free)
 * 
 * Usage:
 * const { theme, toggleTheme } = useTheme()
 */

'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { getFromStorage, saveToStorage } from '../utils/storage'

const ThemeContext = createContext(undefined)

const STORAGE_KEY = 'budget-tracker-theme'

/**
 * Theme Provider Component
 * 
 * Manages theme state and applies theme classes to document
 * 
 * Features:
 * - Light/Dark theme switching
 * - localStorage persistence
 * - System preference detection
 * - Smooth theme transitions
 */
export const ThemeProvider = ({ children }) => {
  // Get initial theme from localStorage or system preference
  const getInitialTheme = () => {
    // Check localStorage first
    const savedTheme = getFromStorage(STORAGE_KEY)
    if (savedTheme === 'dark' || savedTheme === 'light') {
      return savedTheme
    }

    // Check system preference
    if (typeof window !== 'undefined') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      return prefersDark ? 'dark' : 'light'
    }

    // Default to light
    return 'light'
  }

  const [theme, setTheme] = useState('light')

  // Initialize theme on mount
  useEffect(() => {
    const initialTheme = getInitialTheme()
    setTheme(initialTheme)
    applyTheme(initialTheme)
  }, [])

  // Apply theme to document root
  const applyTheme = (newTheme) => {
    if (typeof window === 'undefined') return

    const root = window.document.documentElement
    
    if (newTheme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    applyTheme(newTheme)
    saveToStorage(STORAGE_KEY, newTheme)
  }

  // Update theme when state changes
  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const value = {
    theme,
    toggleTheme,
    isDark: theme === 'dark',
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

/**
 * Custom hook to use theme context
 * 
 * @returns {Object} - Theme state and toggle function
 * 
 * Usage:
 * const { theme, toggleTheme, isDark } = useTheme()
 */
export const useTheme = () => {
  const context = useContext(ThemeContext)
  
  if (context === undefined) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  
  return context
}

