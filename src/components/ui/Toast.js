/**
 * Toast Notification Component
 * 
 * Purpose: Display temporary success/error/info messages
 * 
 * Key Concepts Demonstrated:
 * - Toast notification pattern
 * - Auto-dismiss after delay
 * - Multiple toast support
 * - Animation transitions
 * 
 * Free Tools Used:
 * - CSS animations: Native browser feature
 * - TailwindCSS: Free styling
 * 
 * Usage:
 * const { showToast } = useToast()
 * showToast('Success!', 'success')
 */

'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { CheckCircle, XCircle, Info, AlertCircle, X } from 'lucide-react'
import { cn } from '../../lib/utils'

/**
 * Toast context provider
 */
const ToastContext = React.createContext()

export const useToast = () => {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}

/**
 * Toast item component
 */
const ToastItem = ({ toast, onRemove }) => {
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    // Auto-dismiss after duration
    if (toast.duration !== 0) {
      const timer = setTimeout(() => {
        setIsExiting(true)
        setTimeout(() => onRemove(toast.id), 300) // Wait for animation
      }, toast.duration || 5000)

      return () => clearTimeout(timer)
    }
  }, [toast.id, toast.duration, onRemove])

  const handleRemove = () => {
    setIsExiting(true)
    setTimeout(() => onRemove(toast.id), 300)
  }

  const icons = {
    success: CheckCircle,
    error: XCircle,
    info: Info,
    warning: AlertCircle,
  }

  const styles = {
    success: 'bg-success-50 dark:bg-success-900/20 border-success-200 dark:border-success-800 text-success-800 dark:text-success-200',
    error: 'bg-error-50 dark:bg-error-900/20 border-error-200 dark:border-error-800 text-error-800 dark:text-error-200',
    info: 'bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800 text-primary-800 dark:text-primary-200',
    warning: 'bg-warning-50 dark:bg-warning-900/20 border-warning-200 dark:border-warning-800 text-warning-800 dark:text-warning-200',
  }

  const iconColors = {
    success: 'text-success-500 dark:text-success-400',
    error: 'text-error-500 dark:text-error-400',
    info: 'text-primary-500 dark:text-primary-400',
    warning: 'text-warning-500 dark:text-warning-400',
  }

  const Icon = icons[toast.type] || Info

  return (
    <div
      className={cn(
        'flex items-start gap-3 p-4 rounded-lg border shadow-lg min-w-[300px] max-w-[500px] transition-all duration-300',
        styles[toast.type] || styles.info,
        isExiting ? 'opacity-0 translate-x-full' : 'opacity-100 translate-x-0'
      )}
      role="alert"
      aria-live="polite"
    >
      <Icon className={cn('h-5 w-5 flex-shrink-0 mt-0.5', iconColors[toast.type] || iconColors.info)} />
      <div className="flex-1 min-w-0">
        {toast.title && (
          <p className="font-semibold text-sm mb-1">{toast.title}</p>
        )}
        <p className="text-sm">{toast.message}</p>
      </div>
      <button
        onClick={handleRemove}
        className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        aria-label="Close notification"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

/**
 * Toast container component
 */
const ToastContainer = ({ toasts, onRemove }) => {
  return (
    <div
      className="fixed top-20 right-4 z-[100] flex flex-col gap-2 pointer-events-none"
      aria-live="polite"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <ToastItem toast={toast} onRemove={onRemove} />
        </div>
      ))}
    </div>
  )
}

/**
 * Toast provider component
 */
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const showToast = useCallback((message, type = 'info', options = {}) => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const toast = {
      id,
      message,
      type,
      title: options.title,
      duration: options.duration !== undefined ? options.duration : 5000,
    }

    setToasts((prev) => [...prev, toast])
    return id
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const value = {
    showToast,
    removeToast,
  }

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  )
}

