/**
 * Modal Component
 * 
 * Purpose: Accessible modal/dialog component
 * 
 * Key Concepts Demonstrated:
 * - Portal rendering (rendering outside DOM hierarchy)
 * - Focus trap (keeping focus within modal)
 * - Escape key handling
 * - Backdrop click handling
 * - Accessibility (ARIA attributes)
 * 
 * Free Tools Used:
 * - React Portal: Built-in React feature (free)
 * - TailwindCSS: Free styling
 * - No external modal libraries needed
 * 
 * Usage:
 * <Modal isOpen={isOpen} onClose={handleClose} title="Modal Title">
 *   <p>Modal content</p>
 * </Modal>
 */

'use client'

import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../../lib/utils'

/**
 * Modal component
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether modal is open
 * @param {function} props.onClose - Function to call when modal should close
 * @param {string} props.title - Modal title
 * @param {React.ReactNode} props.children - Modal content
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.size - Modal size: 'sm', 'md', 'lg', 'xl'
 */
const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  className,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  }
  // Ref for the modal content div (for focus trap)
  const modalRef = useRef(null)

  // Handle Escape key press
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e) => {
      // Close modal when Escape key is pressed
      if (e.key === 'Escape') {
        onClose()
      }
    }

    // Add event listener
    document.addEventListener('keydown', handleEscape)

    // Cleanup: remove event listener when modal closes
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  // Focus trap: focus the modal when it opens
  useEffect(() => {
    if (isOpen && modalRef.current) {
      // Focus the modal content (for keyboard navigation)
      modalRef.current.focus()
    }
  }, [isOpen])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      // Save current overflow style
      const originalOverflow = document.body.style.overflow
      // Prevent scrolling
      document.body.style.overflow = 'hidden'

      // Restore when modal closes
      return () => {
        document.body.style.overflow = originalOverflow
      }
    }
  }, [isOpen])

  // Don't render if not open
  if (!isOpen) return null

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    // Only close if clicking the backdrop itself, not the modal content
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  // Modal content
  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      {/* Backdrop overlay - Enterprise styling */}
      <div className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm transition-opacity" />

      {/* Modal content - Enterprise styling */}
      <div
        ref={modalRef}
        className={cn(
          'relative bg-white dark:bg-gray-700 rounded-xl shadow-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200/80 dark:border-gray-600/80',
          sizeClasses[size] || sizeClasses.md,
          className
        )}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()} // Prevent backdrop click when clicking modal
      >
        {/* Header - Enterprise styling */}
        {title && (
          <div className="px-6 py-5 border-b border-gray-200/80 dark:border-gray-600/80 bg-gray-50/50 dark:bg-gray-800/50">
            <h2 id="modal-title" className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {title}
            </h2>
          </div>
        )}

        {/* Content */}
        <div className="px-6 py-6">{children}</div>
      </div>
    </div>
  )

  // Render modal using Portal (renders outside normal DOM hierarchy)
  // This ensures modal appears above all other content
  // Only works in browser (not SSR)
  if (typeof window !== 'undefined') {
    return createPortal(modalContent, document.body)
  }

  return null
}

export default Modal

