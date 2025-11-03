/**
 * Header Component - Enterprise SaaS Design
 * 
 * Purpose: Professional top navigation bar with app branding
 * 
 * Key Concepts Demonstrated:
 * - Enterprise navigation design
 * - Responsive design patterns
 * - Professional iconography
 * 
 * Free Tools Used:
 * - Lucide React: Free, open-source icon library
 * - TailwindCSS: Free styling
 * 
 * Usage:
 * <Header />
 */

'use client'

import { Wallet, Moon, Sun } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

/**
 * Enterprise header component
 * 
 * Features:
 * - Professional branding
 * - Clean, minimal design
 * - Sticky positioning
 * - Sophisticated styling
 */
const Header = () => {
  const { theme, toggleTheme, isDark } = useTheme()

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200/80 dark:border-gray-700/80 sticky top-0 z-50 backdrop-blur-sm bg-white/95 dark:bg-gray-800/95 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo and Title - Enterprise styling */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="flex-shrink-0">
              <div className="p-1.5 sm:p-2 bg-gradient-to-br from-primary-800 to-primary-700 dark:from-primary-dark dark:to-primary-dark rounded-lg shadow-sm">
                <Wallet className="h-4 w-4 sm:h-5 sm:w-5 text-white" aria-hidden="true" />
              </div>
            </div>
            <div>
              <h1 className="text-sm sm:text-lg font-semibold text-gray-900 dark:text-gray-100 tracking-tight">Budget Tracker</h1>
              <p className="hidden sm:block text-xs text-gray-500 dark:text-gray-400 font-medium">Enterprise Finance Management</p>
            </div>
          </div>

          {/* Right side - Theme Toggle */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={toggleTheme}
              className="p-1.5 sm:p-2 rounded-lg text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 touch-manipulation"
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            >
              {isDark ? (
                <Sun className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
              ) : (
                <Moon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
