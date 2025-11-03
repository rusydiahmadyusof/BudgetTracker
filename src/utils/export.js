/**
 * Data Export Utilities
 * 
 * Purpose: Export application data to CSV/JSON formats
 * 
 * Key Concepts Demonstrated:
 * - CSV generation
 * - JSON export
 * - File download
 * - Data transformation
 * 
 * Free Tools Used:
 * - Native JavaScript: No external libraries needed
 * - Blob API: Free browser API
 * - URL.createObjectURL: Free browser API
 * 
 * Usage:
 * exportToCSV(transactions, 'transactions.csv')
 * exportToJSON(data, 'backup.json')
 */

/**
 * Convert array of objects to CSV string
 * 
 * @param {Array} data - Array of objects to convert
 * @param {Array} headers - Array of header names (optional, auto-generated if not provided)
 * @returns {string} - CSV string
 */
export const arrayToCSV = (data, headers = null) => {
  if (!Array.isArray(data) || data.length === 0) {
    return ''
  }

  // Auto-generate headers from first object keys if not provided
  const csvHeaders = headers || Object.keys(data[0])

  // Escape CSV values (handle commas, quotes, newlines)
  const escapeCSV = (value) => {
    if (value === null || value === undefined) return ''
    const stringValue = String(value)
    // If contains comma, quote, or newline, wrap in quotes and escape quotes
    if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
      return `"${stringValue.replace(/"/g, '""')}"`
    }
    return stringValue
  }

  // Create CSV rows
  const rows = [
    // Header row
    csvHeaders.map(escapeCSV).join(','),
    // Data rows
    ...data.map((item) =>
      csvHeaders.map((header) => escapeCSV(item[header])).join(',')
    ),
  ]

  return rows.join('\n')
}

/**
 * Download data as CSV file
 * 
 * @param {Array} data - Array of objects to export
 * @param {string} filename - Name of the file (e.g., 'transactions.csv')
 * @param {Array} headers - Optional custom headers
 */
export const exportToCSV = (data, filename, headers = null) => {
  const csv = arrayToCSV(data, headers)
  
  if (!csv) {
    throw new Error('No data to export')
  }

  // Create blob and download
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  
  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  link.style.visibility = 'hidden'
  
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  
  // Clean up object URL
  URL.revokeObjectURL(url)
}

/**
 * Download data as JSON file
 * 
 * @param {any} data - Data to export (object, array, etc.)
 * @param {string} filename - Name of the file (e.g., 'backup.json')
 */
export const exportToJSON = (data, filename) => {
  const json = JSON.stringify(data, null, 2)
  
  // Create blob and download
  const blob = new Blob([json], { type: 'application/json;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  
  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  link.style.visibility = 'hidden'
  
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  
  // Clean up object URL
  URL.revokeObjectURL(url)
}

/**
 * Export all app data (transactions, categories, budgets)
 * 
 * @param {Object} data - Object containing transactions, categories, budgets
 * @param {string} format - Export format: 'json' or 'csv'
 */
export const exportAllData = (data, format = 'json') => {
  const timestamp = new Date().toISOString().split('T')[0]
  const filename = `budget-tracker-backup-${timestamp}.${format}`

  if (format === 'csv') {
    // Export transactions as CSV (other data can be JSON)
    if (data.transactions && data.transactions.length > 0) {
      exportToCSV(data.transactions, `transactions-${timestamp}.csv`, [
        'id',
        'date',
        'type',
        'amount',
        'description',
        'categoryId',
      ])
    }
    // Export categories and budgets as separate CSV files
    if (data.categories && data.categories.length > 0) {
      exportToCSV(data.categories, `categories-${timestamp}.csv`)
    }
    if (data.budgets && data.budgets.length > 0) {
      exportToCSV(data.budgets, `budgets-${timestamp}.csv`)
    }
  } else {
    // Export everything as single JSON file
    exportToJSON(data, filename)
  }
}

