/**
 * Client Layout Wrapper
 * 
 * Purpose: Wraps client-side components (Header, Sidebar, BottomNav, BudgetProvider)
 *          to be used within the Next.js App Router's root layout.
 * 
 * Key Concepts Demonstrated:
 * - Client Component usage in Next.js
 * - Context Provider integration
 * - Layout composition
 * - Page transitions
 * 
 * Free Tools Used:
 * - React: Free, open-source library
 * - Next.js: Free, open-source React framework
 * - CSS transitions: Native browser feature (free)
 * 
 * This component is marked with 'use client' to enable React hooks and client-side interactivity.
 * It ensures that components requiring browser APIs (like localStorage in BudgetContext) are rendered
 * only on the client.
 */
'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { BudgetProvider } from '../../context/BudgetContext'
import { ThemeProvider } from '../../context/ThemeContext'
import { ToastProvider } from '../ui/Toast'
import ConfirmDialog from '../ui/ConfirmDialog'
import ErrorBoundary from '../shared/ErrorBoundary'
import Header from './Header'
import Sidebar from './Sidebar'
import BottomNav from './BottomNav'

const ClientLayout = ({ children }) => {
  const pathname = usePathname()
  const [displayChildren, setDisplayChildren] = useState(children)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    // Start transition when pathname changes
    setIsTransitioning(true)
    
    // After fade out, update content and fade in
    const timer = setTimeout(() => {
      setDisplayChildren(children)
      // Small delay before fade in for smoother transition
      setTimeout(() => {
        setIsTransitioning(false)
      }, 50)
    }, 200) // Fade out duration

    return () => clearTimeout(timer)
  }, [pathname, children])

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <ToastProvider>
          <BudgetProvider>
            <Header />
            <Sidebar />
            <main className="lg:pl-64 pb-16 lg:pb-0 min-h-screen bg-gray-50 dark:bg-gray-800 transition-colors duration-200">
              <div
                className={`transition-all duration-300 ease-in-out ${
                  isTransitioning 
                    ? 'opacity-0 translate-y-2' 
                    : 'opacity-100 translate-y-0'
                }`}
              >
                {displayChildren}
              </div>
            </main>
            <BottomNav />
            <ConfirmDialog />
          </BudgetProvider>
        </ToastProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default ClientLayout
