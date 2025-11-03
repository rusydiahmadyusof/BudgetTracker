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

import { useState, useEffect } from 'react'
import { Wallet, Moon, Sun, Search, Download, Upload } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { useBudget } from '../../context/BudgetContext'
import SearchModal from '../shared/SearchModal'
import DataExportModal from '../shared/DataExportModal'
import DataImportModal from '../shared/DataImportModal'
import { useToast } from '../ui/Toast'

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
  const { transactions, categories, budgets } = useBudget()
  const { showToast } = useToast()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isExportOpen, setIsExportOpen] = useState(false)
  const [isImportOpen, setIsImportOpen] = useState(false)

  // Handle keyboard shortcut (Ctrl/Cmd + K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Handle data import
  const handleImport = async (importedData) => {
    // This would need to be implemented in BudgetContext
    // For now, show a message
    showToast('Import functionality needs to be connected to context', 'info', {
      title: 'Import',
    })
  }

  return (
    <>
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200/80 dark:border-gray-700/80 sticky top-0 z-50 backdrop-blur-sm bg-white/95 dark:bg-gray-800/95 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Title - Enterprise styling */}
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="p-2 bg-gradient-to-br from-primary-800 to-primary-700 dark:from-primary-dark dark:to-primary-dark rounded-lg shadow-sm">
                  <Wallet className="h-5 w-5 text-white" aria-hidden="true" />
                </div>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100 tracking-tight">Budget Tracker</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Enterprise Finance Management</p>
              </div>
            </div>

            {/* Right side - Actions */}
            <div className="flex items-center space-x-2">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                aria-label="Search"
                title="Search (Ctrl+K)"
              >
                <Search className="h-5 w-5" aria-hidden="true" />
              </button>

              {/* Export Button */}
              <button
                onClick={() => setIsExportOpen(true)}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                aria-label="Export Data"
                title="Export Data"
              >
                <Download className="h-5 w-5" aria-hidden="true" />
              </button>

              {/* Import Button */}
              <button
                onClick={() => setIsImportOpen(true)}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                aria-label="Import Data"
                title="Import Data"
              >
                <Upload className="h-5 w-5" aria-hidden="true" />
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              >
                {isDark ? (
                  <Sun className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <Moon className="h-5 w-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Modals */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <DataExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        transactions={transactions}
        categories={categories}
        budgets={budgets}
      />
      <DataImportModal
        isOpen={isImportOpen}
        onClose={() => setIsImportOpen(false)}
        onImport={handleImport}
      />
    </>
  )
}

export default Header

