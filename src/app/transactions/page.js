/**
 * Transactions Page
 * 
 * Purpose: Full transaction management page
 * 
 * Key Concepts Demonstrated:
 * - Next.js App Router page component
 * - File-based routing (/transactions route)
 * 
 * Free Tools Used:
 * - Next.js: Free routing system
 * 
 * This page displays the transaction list with all features
 */
'use client'

import TransactionList from '../../components/transactions/TransactionList'

export default function TransactionsPage() {
  return <TransactionList />
}

