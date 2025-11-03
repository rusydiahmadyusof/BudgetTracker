/**
 * Confirmation Dialog Component
 * 
 * Purpose: Replace native confirm() with styled modal dialog
 * 
 * Key Concepts Demonstrated:
 * - Custom modal dialog
 * - Promise-based API
 * - Accessible dialog pattern
 * 
 * Free Tools Used:
 * - TailwindCSS: Free styling
 * - Lucide React: Free icons
 * 
 * Usage:
 * const confirmed = await confirmDialog('Are you sure?', 'This action cannot be undone')
 */

'use client'

import { useState, useEffect } from 'react'
import { AlertTriangle } from 'lucide-react'
import Modal from './Modal'
import Button from './Button'

/**
 * Confirmation dialog hook
 */
let confirmDialogInstance = null

export const setConfirmDialogInstance = (instance) => {
  confirmDialogInstance = instance
}

export const confirmDialog = (title, message, options = {}) => {
  if (!confirmDialogInstance) {
    // Fallback to native confirm if hook not available
    return Promise.resolve(window.confirm(`${title}\n\n${message}`))
  }
  return confirmDialogInstance.show(title, message, options)
}

/**
 * Confirmation dialog component
 */
const ConfirmDialog = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [options, setOptions] = useState({})
  const [resolve, setResolve] = useState(null)

  useEffect(() => {
    setConfirmDialogInstance({
      show: (title, message, options) => {
        return new Promise((res) => {
          setTitle(title)
          setMessage(message)
          setOptions(options)
          setResolve(() => res)
          setIsOpen(true)
        })
      },
    })
  }, [])

  const handleConfirm = () => {
    setIsOpen(false)
    if (resolve) {
      resolve(true)
      setResolve(null)
    }
  }

  const handleCancel = () => {
    setIsOpen(false)
    if (resolve) {
      resolve(false)
      setResolve(null)
    }
  }

  const confirmLabel = options.confirmLabel || 'Confirm'
  const cancelLabel = options.cancelLabel || 'Cancel'
  const variant = options.variant || 'danger'

  return (
    <Modal isOpen={isOpen} onClose={handleCancel} size="sm">
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="flex-shrink-0">
            <div className="p-2 bg-error-50 dark:bg-error-900/20 rounded-full">
              <AlertTriangle className="h-6 w-6 text-error-500 dark:text-error-400" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {message}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6">
          <Button
            variant="secondary"
            onClick={handleCancel}
          >
            {cancelLabel}
          </Button>
          <Button
            variant={variant}
            onClick={handleConfirm}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmDialog

