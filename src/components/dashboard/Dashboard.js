/**
 * Dashboard Component
 * 
 * Purpose: Main dashboard container that combines all dashboard widgets
 * 
 * Key Concepts Demonstrated:
 * - Component composition
 * - Grid layout (TailwindCSS)
 * - Data aggregation
 * - Context API usage
 * 
 * Free Tools Used:
 * - Calculation utilities: Free functions
 * - formatCurrency: Free utility
 * 
 * Usage:
 * <Dashboard />
 */

'use client'

import { useBudget } from '../../context/BudgetContext'
import {
  calculateTotalIncome,
  calculateTotalExpenses,
  calculateBalance,
} from '../../utils/calculations'
import { formatCurrency } from '../../utils/formatters'
import SummaryCard from './SummaryCard'
import QuickAdd from './QuickAdd'
import RecentTransactions from './RecentTransactions'
import ExpenseChart from './ExpenseChart'
import SpendingChart from './DailySpendingChart'
import { ArrowUpCircle, ArrowDownCircle, Wallet } from 'lucide-react'

/**
 * Main dashboard component
 * 
 * Displays:
 * - Summary cards (Income, Expenses, Balance)
 * - Quick add transaction form
 * - Recent transactions list
 * - Expense breakdown chart
 */
const Dashboard = () => {
  const { transactions } = useBudget()

  // Calculate current month's date range
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)

  // Calculate totals for current month
  const totalIncome = calculateTotalIncome(transactions, startOfMonth, endOfMonth)
  const totalExpenses = calculateTotalExpenses(transactions, startOfMonth, endOfMonth)
  const balance = calculateBalance(transactions, startOfMonth, endOfMonth)

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
      {/* Page Title - Enterprise styling */}
      <div className="mb-4 sm:mb-6 lg:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">Dashboard</h1>
        <p className="mt-1 sm:mt-2 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
          Overview of your finances
        </p>
      </div>

      {/* Spending Chart with Daily/Weekly/Monthly Views - Above Summary Cards */}
      <div className="mb-4 sm:mb-6 lg:mb-8">
        <SpendingChart />
      </div>

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6 lg:mb-8">
        <SummaryCard
          title="Total Income"
          amount={totalIncome}
          icon={ArrowUpCircle}
          variant="success"
        />
        <SummaryCard
          title="Total Expenses"
          amount={totalExpenses}
          icon={ArrowDownCircle}
          variant="error"
        />
        <SummaryCard
          title="Net Balance"
          amount={balance}
          icon={Wallet}
          variant={balance >= 0 ? 'success' : 'error'}
        />
      </div>

      {/* Quick Add and Chart Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6 lg:mb-8">
        <QuickAdd />
        <ExpenseChart />
      </div>

      {/* Recent Transactions */}
      <div className="mb-4 sm:mb-6 lg:mb-8">
        <RecentTransactions limit={10} />
      </div>
    </div>
  )
}

export default Dashboard
