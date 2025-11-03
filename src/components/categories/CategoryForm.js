/**
 * Category Form Component
 * 
 * Purpose: Form to add or edit categories
 * 
 * Key Concepts Demonstrated:
 * - Form handling
 * - Color picker (preset colors)
 * - Icon selector (Lucide icons)
 * - Form validation
 * 
 * Free Tools Used:
 * - Lucide React: Free icons
 * - Modal: Free custom component
 * 
 * Usage:
 * <CategoryForm
 *   isOpen={isOpen}
 *   onClose={handleClose}
 *   category={category} // For edit mode
 *   onSave={handleSave}
 * />
 */

'use client'

import { useState, useEffect } from 'react'
import { useToast } from '../ui/Toast'
import Modal from '../ui/Modal'
import Input from '../ui/Input'
import Button from '../ui/Button'
import ErrorMessage from '../shared/ErrorMessage'
import { CATEGORY_COLORS } from '../../utils/constants'
import * as LucideIcons from 'lucide-react'

/**
 * Popular icons for categories (common ones)
 */
const POPULAR_ICONS = [
  'UtensilsCrossed',
  'Car',
  'ShoppingBag',
  'Film',
  'Receipt',
  'Heart',
  'GraduationCap',
  'Home',
  'Plane',
  'Coffee',
  'Tag',
]

/**
 * Category form modal component
 * 
 * Features:
 * - Name input
 * - Color picker (preset colors)
 * - Icon selector (Lucide icons)
 * - Add/Edit mode
 */
const CategoryForm = ({
  isOpen,
  onClose,
  category = null,
  onSave,
}) => {
  const { showToast } = useToast()
  const [name, setName] = useState('')
  const [color, setColor] = useState(CATEGORY_COLORS[0])
  const [icon, setIcon] = useState('Tag')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      if (category) {
        // Edit mode
        setName(category.name)
        setColor(category.color || CATEGORY_COLORS[0])
        setIcon(category.icon || 'Tag')
        setError('')
      } else {
        // Add mode
        setName('')
        setColor(CATEGORY_COLORS[0])
        setIcon('Tag')
        setError('')
      }
    }
  }, [isOpen, category])

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!name.trim()) {
      setError('Please enter a category name')
      return
    }

    setIsSubmitting(true)

    try {
      const categoryData = {
        name: name.trim(),
        color,
        icon,
      }

      await onSave(categoryData)
      onClose()
      // Toast notification will be shown by parent component
    } catch (err) {
      const errorMessage = err.message || 'Failed to save category. Please try again.'
      setError(errorMessage)
      showToast(errorMessage, 'error', { title: 'Error' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={category ? 'Edit Category' : 'Add Category'}
      className="max-w-md"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Input */}
        <Input
          type="text"
          label="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Food & Dining"
          required
        />

        {/* Color Picker */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Color
          </label>
          <div className="grid grid-cols-6 gap-2">
            {CATEGORY_COLORS.map((colorOption) => (
              <button
                key={colorOption}
                type="button"
                onClick={() => setColor(colorOption)}
                className={`w-10 h-10 rounded-lg border-2 transition-all ${
                  color === colorOption
                    ? 'border-gray-900 dark:border-gray-200 scale-110'
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                }`}
                style={{ backgroundColor: colorOption }}
                aria-label={`Select color ${colorOption}`}
              />
            ))}
          </div>
        </div>

        {/* Icon Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Icon
          </label>
          <div className="grid grid-cols-6 gap-2 max-h-48 overflow-y-auto">
            {POPULAR_ICONS.map((iconName) => {
              const IconComponent = LucideIcons[iconName] || LucideIcons.Tag
              const isSelected = icon === iconName

              return (
                <button
                  key={iconName}
                  type="button"
                  onClick={() => setIcon(iconName)}
                  className={`p-2 rounded-lg border-2 transition-all flex items-center justify-center ${
                    isSelected
                      ? 'border-primary-800 dark:border-primary-dark bg-primary-50 dark:bg-primary-dark/20'
                      : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                  }`}
                  aria-label={`Select icon ${iconName}`}
                >
                  <IconComponent
                    className={`h-5 w-5 ${
                      isSelected ? 'text-primary-800 dark:text-primary-dark' : 'text-gray-600 dark:text-gray-400'
                    }`}
                  />
                </button>
              )
            })}
          </div>
        </div>

        {/* Preview */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Preview:</p>
          <div className="flex items-center space-x-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${color}20` }}
            >
              {(() => {
                const IconComponent = LucideIcons[icon] || LucideIcons.Tag
                return (
                  <IconComponent className="h-5 w-5" style={{ color }} />
                )
              })()}
            </div>
            <span className="font-medium text-gray-900 dark:text-gray-100">{name || 'Category Name'}</span>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="text-sm text-error-400 bg-error-50 p-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Form Actions */}
        <div className="flex items-center justify-end space-x-3 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary" loading={isSubmitting}>
            {category ? 'Update' : 'Add'} Category
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default CategoryForm

