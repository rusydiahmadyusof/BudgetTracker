/**
 * Dashboard Page (Home Page)
 * 
 * Purpose: Main dashboard showing budget overview
 * 
 * Key Concepts Demonstrated:
 * - Next.js App Router page component
 * - File-based routing (this file = / route)
 * - Component composition
 * 
 * Free Tools Used:
 * - Next.js: Free routing and page system
 * 
 * This page displays the main dashboard with all widgets
 */
'use client'

import Dashboard from '../components/dashboard/Dashboard'

export default function Home() {
  return <Dashboard />
}

