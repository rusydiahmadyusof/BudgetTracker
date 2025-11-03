/**
 * Data Import Utilities
 * 
 * Purpose: Import data from CSV/JSON files
 * 
 * Key Concepts Demonstrated:
 * - File reading
 * - CSV parsing
 * - JSON parsing
 * - Data validation
 * 
 * Free Tools Used:
 * - FileReader API: Free browser API
 * - Native JavaScript: No external libraries needed
 * 
 * Usage:
 * importFromCSV(file).then(data => console.log(data))
 * importFromJSON(file).then(data => console.log(data))
 */

/**
 * Parse CSV string to array of objects
 * 
 * @param {string} csv - CSV string
 * @param {boolean} hasHeaders - Whether first row contains headers
 * @returns {Array} - Array of objects
 */
export const parseCSV = (csv, hasHeaders = true) => {
  const lines = csv.split('\n').filter((line) => line.trim())
  
  if (lines.length === 0) {
    return []
  }

  const rows = lines.map((line) => {
    const values = []
    let currentValue = ''
    let inQuotes = false

    // Parse CSV line handling quoted values
    for (let i = 0; i < line.length; i++) {
      const char = line[i]
      const nextChar = line[i + 1]

      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          // Escaped quote
          currentValue += '"'
          i++ // Skip next quote
        } else {
          // Toggle quote state
          inQuotes = !inQuotes
        }
      } else if (char === ',' && !inQuotes) {
        // End of value
        values.push(currentValue.trim())
        currentValue = ''
      } else {
        currentValue += char
      }
    }
    // Add last value
    values.push(currentValue.trim())
    return values
  })

  if (hasHeaders && rows.length > 0) {
    const headers = rows[0]
    return rows.slice(1).map((row) => {
      const obj = {}
      headers.forEach((header, index) => {
        obj[header.trim()] = row[index] || ''
      })
      return obj
    })
  }

  return rows
}

/**
 * Read file as text
 * 
 * @param {File} file - File object
 * @returns {Promise<string>} - File content as string
 */
const readFileAsText = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => resolve(e.target.result)
    reader.onerror = (e) => reject(new Error('Failed to read file'))
    reader.readAsText(file)
  })
}

/**
 * Import data from CSV file
 * 
 * @param {File} file - CSV file
 * @returns {Promise<Array>} - Array of objects
 */
export const importFromCSV = async (file) => {
  if (!file) {
    throw new Error('No file provided')
  }

  if (!file.name.endsWith('.csv')) {
    throw new Error('File must be a CSV file')
  }

  const text = await readFileAsText(file)
  return parseCSV(text, true)
}

/**
 * Import data from JSON file
 * 
 * @param {File} file - JSON file
 * @returns {Promise<any>} - Parsed JSON data
 */
export const importFromJSON = async (file) => {
  if (!file) {
    throw new Error('No file provided')
  }

  if (!file.name.endsWith('.json')) {
    throw new Error('File must be a JSON file')
  }

  const text = await readFileAsText(file)
  
  try {
    return JSON.parse(text)
  } catch (error) {
    throw new Error('Invalid JSON file: ' + error.message)
  }
}

/**
 * Validate transaction data
 * 
 * @param {Object} transaction - Transaction object
 * @returns {Object} - { valid: boolean, errors: string[] }
 */
export const validateTransaction = (transaction) => {
  const errors = []

  if (!transaction.date) {
    errors.push('Date is required')
  } else {
    const date = new Date(transaction.date)
    if (isNaN(date.getTime())) {
      errors.push('Invalid date format')
    }
  }

  if (!transaction.type || !['income', 'expense'].includes(transaction.type)) {
    errors.push('Type must be "income" or "expense"')
  }

  if (!transaction.amount || isNaN(parseFloat(transaction.amount))) {
    errors.push('Amount must be a valid number')
  } else if (parseFloat(transaction.amount) <= 0) {
    errors.push('Amount must be greater than 0')
  }

  if (!transaction.description || !transaction.description.trim()) {
    errors.push('Description is required')
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

/**
 * Validate and normalize imported transactions
 * 
 * @param {Array} transactions - Array of transaction objects
 * @returns {Array} - Validated and normalized transactions
 */
export const validateAndNormalizeTransactions = (transactions) => {
  if (!Array.isArray(transactions)) {
    throw new Error('Transactions must be an array')
  }

  const normalized = []
  const errors = []

  transactions.forEach((transaction, index) => {
    try {
      // Normalize date format
      let date = transaction.date
      if (date) {
        const parsedDate = new Date(date)
        if (!isNaN(parsedDate.getTime())) {
          date = parsedDate.toISOString()
        } else {
          throw new Error(`Invalid date at row ${index + 1}`)
        }
      }

      // Normalize amount
      const amount = parseFloat(transaction.amount)
      if (isNaN(amount) || amount <= 0) {
        throw new Error(`Invalid amount at row ${index + 1}`)
      }

      // Normalize type
      const type = transaction.type?.toLowerCase()
      if (!['income', 'expense'].includes(type)) {
        throw new Error(`Invalid type at row ${index + 1}`)
      }

      // Create normalized transaction
      normalized.push({
        id: transaction.id || `imported_${Date.now()}_${index}`,
        date,
        type,
        amount,
        description: String(transaction.description || '').trim(),
        categoryId: transaction.categoryId || null,
      })
    } catch (error) {
      errors.push(`Row ${index + 1}: ${error.message}`)
    }
  })

  if (errors.length > 0 && normalized.length === 0) {
    throw new Error(`Import failed:\n${errors.join('\n')}`)
  }

  return {
    transactions: normalized,
    errors: errors.length > 0 ? errors : null,
  }
}

