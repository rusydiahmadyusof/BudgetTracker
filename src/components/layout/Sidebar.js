/**
 * Sidebar Component
 * 
 * Purpose: Desktop navigation sidebar
 * 
 * Key Concepts Demonstrated:
 * - Active route detection
 * - Navigation patterns
 * - Icon + text navigation items
 * - Responsive design (hidden on mobile)
 * 
 * Free Tools Used:
 * - Next.js Link: Free routing (no external router needed)
 * - Lucide React: Free icons
 * - TailwindCSS: Free styling
 * 
 * Usage:
 * <Sidebar />
 */

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Receipt, Tag, Target } from 'lucide-react'
import { cn } from '../../lib/utils'

/**
 * Navigation items configuration
 * Each item has: path, label, icon
 */
const navigationItems = [
  {
    path: '/',
    label: 'Dashboard',
    icon: Home,
  },
  {
    path: '/transactions',
    label: 'Transactions',
    icon: Receipt,
  },
  {
    path: '/categories',
    label: 'Categories',
    icon: Tag,
  },
  {
    path: '/budgets',
    label: 'Budgets',
    icon: Target,
  },
]

/**
 * Sidebar navigation component
 * 
 * Features:
 * - Active route highlighting
 * - Icon + label for each route
 * - Keyboard navigation support
 * - Hidden on mobile (use BottomNav instead)
 */
const Sidebar = () => {
  // Get current pathname to highlight active route
  // usePathname is a Next.js hook that returns the current route
  const pathname = usePathname()

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:pt-16 bg-white dark:bg-gray-800 border-r border-gray-200/80 dark:border-gray-700/80 transition-colors duration-200">
      <nav className="flex-1 px-3 py-6 space-y-1">
        {navigationItems.map((item) => {
          const Icon = item.icon
          // Check if current route matches this nav item
          const isActive =
            item.path === '/' ? pathname === '/' : pathname?.startsWith(item.path)

          return (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                'flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group',
                isActive
                  ? 'bg-primary-50 dark:bg-primary-dark/20 text-primary-800 dark:text-primary-dark shadow-sm border border-primary-200 dark:border-primary-dark/30'
                  : 'text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-100'
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon
                className={cn(
                  'mr-3 h-5 w-5 transition-colors',
                  isActive 
                    ? 'text-primary-800 dark:text-primary-dark' 
                    : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300'
                )}
                aria-hidden="true"
              />
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar

