/**
 * Data Export Modal Component
 * 
 * Purpose: Provide UI for exporting data
 * 
 * Key Concepts Demonstrated:
 * - Modal dialog
 * - File download
 * - Data export options
 * 
 * Free Tools Used:
 * - exportToCSV, exportToJSON: Free utility functions
 * 
 * Usage:
 * <DataExportModal isOpen={isOpen} onClose={onClose} data={data} />
 */

'use client'

import { useState } from 'react'
import { Download, FileText, FileJson } from 'lucide-react'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import { exportToCSV, exportToJSON, exportAllData } from '../../utils/export'
import { useToast } from '../ui/Toast'
import { cn } from '../../lib/utils'

/**
 * Data export modal component
 */
const DataExportModal = ({ isOpen, onClose, transactions, categories, budgets }) => {
  const { showToast } = useToast()
  const [exportFormat, setExportFormat] = useState('json') // 'json' or 'csv'
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async () => {
    setIsExporting(true)

    try {
      if (exportFormat === 'json') {
        // Export all data as single JSON file
        const allData = {
          transactions: transactions || [],
          categories: categories || [],
          budgets: budgets || [],
          exportedAt: new Date().toISOString(),
        }
        exportAllData(allData, 'json')
        showToast('Data exported successfully', 'success', { title: 'Export Complete' })
      } else {
        // Export transactions as CSV
        if (transactions && transactions.length > 0) {
          exportToCSV(transactions, 'transactions.csv', [
            'date',
            'type',
            'amount',
            'description',
            'categoryId',
          ])
          showToast('Transactions exported successfully', 'success', { title: 'Export Complete' })
        } else {
          showToast('No transactions to export', 'warning', { title: 'No Data' })
        }
      }
      onClose()
    } catch (error) {
      showToast(error.message || 'Failed to export data', 'error', { title: 'Export Failed' })
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Export Data" size="sm">
      <div className="space-y-6">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Choose a format to export your data:
          </p>

          {/* Format Selection */}
          <div className="space-y-3">
            <label className="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <input
                type="radio"
                name="format"
                value="json"
                checked={exportFormat === 'json'}
                onChange={(e) => setExportFormat(e.target.value)}
                className="mr-3"
              />
              <FileJson className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-3" />
              <div className="flex-1">
                <div className="font-medium text-gray-900 dark:text-gray-100">JSON Format</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Complete backup (transactions, categories, budgets)
                </div>
              </div>
            </label>

            <label className="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <input
                type="radio"
                name="format"
                value="csv"
                checked={exportFormat === 'csv'}
                onChange={(e) => setExportFormat(e.target.value)}
                className="mr-3"
              />
              <FileText className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-3" />
              <div className="flex-1">
                <div className="font-medium text-gray-900 dark:text-gray-100">CSV Format</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Transactions only (compatible with Excel)
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Export Info */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            {exportFormat === 'json' ? (
              <>
                <strong>JSON Export:</strong> Includes all transactions, categories, and budgets in a single file. Perfect for backups and data migration.
              </>
            ) : (
              <>
                <strong>CSV Export:</strong> Transactions only in spreadsheet format. Can be opened in Excel, Google Sheets, or any CSV reader.
              </>
            )}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-600">
          <Button variant="secondary" onClick={onClose} disabled={isExporting}>
            Cancel
          </Button>
            <Button
            variant="primary"
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            {isExporting ? 'Exporting...' : `Export ${exportFormat.toUpperCase()}`}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default DataExportModal

