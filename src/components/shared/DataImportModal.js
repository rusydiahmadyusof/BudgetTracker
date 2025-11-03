/**
 * Data Import Modal Component
 * 
 * Purpose: Provide UI for importing data from files
 * 
 * Key Concepts Demonstrated:
 * - File input handling
 * - File reading
 * - Data validation
 * - Error handling
 * 
 * Free Tools Used:
 * - importFromCSV, importFromJSON: Free utility functions
 * 
 * Usage:
 * <DataImportModal isOpen={isOpen} onClose={onClose} onImport={handleImport} />
 */

'use client'

import { useState, useRef } from 'react'
import { Upload, FileText, FileJson, AlertCircle } from 'lucide-react'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import ErrorMessage from './ErrorMessage'
import { importFromCSV, importFromJSON, validateAndNormalizeTransactions } from '../../utils/import'
import { useToast } from '../ui/Toast'

/**
 * Data import modal component
 */
const DataImportModal = ({ isOpen, onClose, onImport }) => {
  const { showToast } = useToast()
  const fileInputRef = useRef(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [isImporting, setIsImporting] = useState(false)
  const [error, setError] = useState('')
  const [importType, setImportType] = useState('json') // 'json' or 'csv'

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setError('')
      
      // Auto-detect format from file extension
      if (file.name.endsWith('.csv')) {
        setImportType('csv')
      } else if (file.name.endsWith('.json')) {
        setImportType('json')
      }
    }
  }

  const handleImport = async () => {
    if (!selectedFile) {
      setError('Please select a file')
      return
    }

    setIsImporting(true)
    setError('')

    try {
      let importedData

      if (importType === 'csv' || selectedFile.name.endsWith('.csv')) {
        // Import CSV
        const csvData = await importFromCSV(selectedFile)
        const validated = validateAndNormalizeTransactions(csvData)
        
        if (validated.errors && validated.errors.length > 0) {
          showToast(
            `Imported ${validated.transactions.length} transactions with ${validated.errors.length} errors`,
            'warning',
            { title: 'Import Complete' }
          )
        } else {
          showToast(
            `Successfully imported ${validated.transactions.length} transactions`,
            'success',
            { title: 'Import Complete' }
          )
        }

        importedData = {
          transactions: validated.transactions,
        }
      } else {
        // Import JSON
        const jsonData = await importFromJSON(selectedFile)
        
        // Validate transactions if present
        if (jsonData.transactions && Array.isArray(jsonData.transactions)) {
          const validated = validateAndNormalizeTransactions(jsonData.transactions)
          jsonData.transactions = validated.transactions
          
          if (validated.errors && validated.errors.length > 0) {
            showToast(
              `Imported data with ${validated.errors.length} validation errors`,
              'warning',
              { title: 'Import Complete' }
            )
          } else {
            showToast('Data imported successfully', 'success', { title: 'Import Complete' })
          }
        } else {
          showToast('Data imported successfully', 'success', { title: 'Import Complete' })
        }

        importedData = jsonData
      }

      // Call parent handler with imported data
      if (onImport) {
        await onImport(importedData)
      }

      // Reset and close
      setSelectedFile(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
      onClose()
    } catch (err) {
      setError(err.message || 'Failed to import file. Please check the file format.')
      showToast(err.message || 'Failed to import file', 'error', { title: 'Import Failed' })
    } finally {
      setIsImporting(false)
    }
  }

  const handleClose = () => {
    setSelectedFile(null)
    setError('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Import Data" size="md">
      <div className="space-y-6">
        {/* Format Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            File Format
          </label>
          <div className="flex gap-3">
            <label className="flex-1 flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <input
                type="radio"
                name="importFormat"
                value="json"
                checked={importType === 'json'}
                onChange={(e) => setImportType(e.target.value)}
                className="mr-3"
              />
              <FileJson className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-3" />
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">JSON</span>
            </label>

            <label className="flex-1 flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <input
                type="radio"
                name="importFormat"
                value="csv"
                checked={importType === 'csv'}
                onChange={(e) => setImportType(e.target.value)}
                className="mr-3"
              />
              <FileText className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-3" />
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">CSV</span>
            </label>
          </div>
        </div>

        {/* File Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Select File
          </label>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
            <input
              ref={fileInputRef}
              type="file"
              accept={importType === 'csv' ? '.csv' : '.json'}
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <Upload className="h-8 w-8 text-gray-400 mb-2" />
              <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                Click to upload
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {importType === 'csv' ? 'CSV file' : 'JSON file'}
              </span>
            </label>
            {selectedFile && (
              <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {importType === 'csv' ? (
                      <FileText className="h-4 w-4 text-gray-400" />
                    ) : (
                      <FileJson className="h-4 w-4 text-gray-400" />
                    )}
                    <span className="text-sm text-gray-900 dark:text-gray-100">
                      {selectedFile.name}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {(selectedFile.size / 1024).toFixed(2)} KB
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Import Info */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-500 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-blue-800 dark:text-blue-200">
              <p className="font-medium mb-1">Import Note:</p>
              <p>
                {importType === 'json' ? (
                  <>Importing JSON will merge with existing data. Duplicate IDs will be skipped.</>
                ) : (
                  <>CSV import will add transactions. Make sure your CSV has columns: date, type, amount, description, categoryId</>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && <ErrorMessage message={error} />}

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-600">
          <Button variant="secondary" onClick={handleClose} disabled={isImporting}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleImport}
            disabled={!selectedFile || isImporting}
            className="flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            {isImporting ? 'Importing...' : 'Import Data'}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default DataImportModal

