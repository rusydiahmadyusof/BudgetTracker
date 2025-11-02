/**
 * Root Layout Component
 * 
 * Purpose: Provides the root HTML structure and wraps all pages with providers
 * 
 * Key Concepts Demonstrated:
 * - Next.js App Router layout pattern
 * - Global providers setup
 * - Metadata configuration
 * - Server/Client component separation
 * 
 * Free Tools Used:
 * - Next.js: Free, open-source React framework
 * - React: Free, open-source library
 * 
 * This layout:
 * - Sets up the HTML structure (server component)
 * - Imports global styles
 * - Uses ClientLayout wrapper for client-side components
 * 
 * Note: This is a server component (exports metadata)
 * Client components are wrapped in ClientLayout
 */
import './globals.css'
import ClientLayout from '../components/layout/ClientLayout'

export const metadata = {
  title: 'Budget Tracker - Enterprise Finance Management',
  description: 'A professional budget tracker built with Next.js and React',
  icons: {
    icon: '/icon.svg',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* ClientLayout wraps client-side components (Header, Sidebar, BottomNav, BudgetProvider) */}
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
