/**
 * Bottom Navigation Component
 * 
 * Purpose: Mobile bottom navigation bar
 * 
 * Key Concepts Demonstrated:
 * - Mobile-first navigation
 * - Touch-friendly sizing
 * - Active state indicators
 * - Responsive design (shown only on mobile)
 * 
 * Free Tools Used:
 * - Next.js Link: Free routing
 * - Lucide React: Free icons
 * - TailwindCSS: Free styling
 * 
 * Usage:
 * <BottomNav />
 */

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Receipt, Tag, Target } from 'lucide-react'
import { cn } from '../../lib/utils'

/**
 * Navigation items for bottom nav
 * Same as Sidebar but optimized for mobile
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
 * Bottom navigation component for mobile devices
 * 
 * Features:
 * - Fixed at bottom of screen
 * - Touch-friendly button sizes
 * - Active state indicators
 * - Hidden on desktop (lg breakpoint and above)
 */
const BottomNav = () => {
  const pathname = usePathname()

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-40 transition-colors duration-200">
      <div className="flex items-center justify-around h-16">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive =
            item.path === '/' ? pathname === '/' : pathname?.startsWith(item.path)

          return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    'relative flex flex-col items-center justify-center flex-1 h-full transition-colors',
                    isActive
                      ? 'text-primary-800 dark:text-primary-dark'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
              <Icon
                className={cn('h-6 w-6 mb-1', isActive && 'text-primary-800 dark:text-primary-dark')}
                aria-hidden="true"
              />
              <span className="text-xs font-medium">{item.label}</span>
              {/* Active indicator dot */}
              {isActive && (
                <span
                  className="absolute top-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-primary-800 dark:bg-primary-dark rounded-full"
                  aria-hidden="true"
                />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export default BottomNav

