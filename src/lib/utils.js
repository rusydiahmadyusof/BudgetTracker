/**
 * Utility Functions
 * 
 * Purpose: General utility functions used across the app
 * 
 * Key Concepts Demonstrated:
 * - Class name merging utility (for TailwindCSS)
 * - Helper functions
 * 
 * Free Tools Used:
 * - Pure JavaScript - no external libraries needed
 */

/**
 * Merge class names together
 * 
 * @param {...string} classes - Class names to merge
 * @returns {string} - Merged class names
 * 
 * This utility helps combine TailwindCSS classes conditionally
 * Useful for dynamic styling based on props/state
 */
export const cn = (...classes) => {
  // Filter out falsy values (null, undefined, empty strings)
  // This allows conditional classes like: cn('base-class', condition && 'conditional-class')
  return classes.filter(Boolean).join(' ')
}

