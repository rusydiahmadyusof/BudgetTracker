/**
 * Spending Chart Component
 * 
 * Purpose: Display spending over time with daily, weekly, or monthly views
 * 
 * Key Concepts Demonstrated:
 * - Chart integration (Recharts - free library)
 * - Data aggregation by date/week/month
 * - Time series data visualization
 * - Responsive chart sizing
 * - State management for view selection
 * 
 * Free Tools Used:
 * - Recharts: Free, open-source React charting library
 * - date-fns: Free date utilities for grouping
 * 
 * Usage:
 * <SpendingChart />
 */

'use client'

import { useState } from 'react'
import { useTransactions } from '../../hooks/useTransactions'
import {
  format,
  subDays,
  subWeeks,
  subMonths,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  parseISO,
  isWithinInterval,
} from 'date-fns'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { formatCurrency } from '../../utils/formatters'

/**
 * Spending chart component with view options
 * 
 * Features:
 * - Line chart showing expenses
 * - Daily, Weekly, or Monthly views
 * - Interactive tooltips
 * - Responsive sizing
 * - View selector
 */
const SpendingChart = () => {
  const { transactions } = useTransactions()
  const [viewType, setViewType] = useState('daily') // 'daily', 'weekly', 'monthly'

  // Get date range based on view type
  const getDateRange = () => {
    const endDate = new Date()
    
    switch (viewType) {
      case 'weekly':
        // Show last 12 weeks
        return {
          startDate: subWeeks(endDate, 12),
          endDate,
          periods: 12,
        }
      case 'monthly':
        // Show last 12 months
        return {
          startDate: subMonths(endDate, 12),
          endDate,
          periods: 12,
        }
      default: // daily
        // Show last 30 days
        return {
          startDate: subDays(endDate, 30),
          endDate,
          periods: 30,
        }
    }
  }

  const { startDate, endDate, periods } = getDateRange()

  // Filter expense transactions within date range
  const expenseTransactions = Array.isArray(transactions)
    ? transactions.filter((transaction) => {
        if (transaction.type !== 'expense') return false
        
        const transactionDate = typeof transaction.date === 'string'
          ? parseISO(transaction.date)
          : new Date(transaction.date)
        
        return transactionDate >= startDate && transactionDate <= endDate
      })
    : []

  // Group transactions by period (day/week/month) and sum amounts
  const periodSpending = {}
  
  expenseTransactions.forEach((transaction) => {
    const transactionDate = typeof transaction.date === 'string'
      ? parseISO(transaction.date)
      : new Date(transaction.date)
    
    let periodKey, periodFormatted
    
    switch (viewType) {
      case 'weekly':
        // Group by week (start of week as key)
        const weekStart = startOfWeek(transactionDate, { weekStartsOn: 1 }) // Monday
        periodKey = format(weekStart, 'yyyy-MM-dd')
        periodFormatted = format(weekStart, 'MMM dd')
        break
      case 'monthly':
        // Group by month
        const monthStart = startOfMonth(transactionDate)
        periodKey = format(monthStart, 'yyyy-MM')
        periodFormatted = format(monthStart, 'MMM yyyy')
        break
      default: // daily
        // Group by day
        periodKey = format(transactionDate, 'yyyy-MM-dd')
        periodFormatted = format(transactionDate, 'MMM dd')
    }
    
    // Initialize period if not exists
    if (!periodSpending[periodKey]) {
      periodSpending[periodKey] = {
        period: periodKey,
        periodFormatted,
        amount: 0,
      }

    }
    
    // Add transaction amount to period total
    periodSpending[periodKey].amount += parseFloat(transaction.amount) || 0
  })

  // Generate chart data array with all periods filled in
  const chartData = []
  
  for (let i = 0; i < periods; i++) {
    let periodDate, periodKey, periodFormatted
    
    switch (viewType) {
      case 'weekly':
        periodDate = subWeeks(endDate, periods - 1 - i)
        const weekStart = startOfWeek(periodDate, { weekStartsOn: 1 })
        periodKey = format(weekStart, 'yyyy-MM-dd')
        periodFormatted = format(weekStart, 'MMM dd')
        break
      case 'monthly':
        periodDate = subMonths(endDate, periods - 1 - i)
        const monthStart = startOfMonth(periodDate)
        periodKey = format(monthStart, 'yyyy-MM')
        periodFormatted = format(monthStart, 'MMM yyyy')
        break
      default: // daily
        periodDate = subDays(endDate, periods - 1 - i)
        periodKey = format(periodDate, 'yyyy-MM-dd')
        periodFormatted = format(periodDate, 'MMM dd')
    }
    
    chartData.push({
      period: periodKey,
      periodFormatted,
      amount: periodSpending[periodKey]?.amount || 0,
    })
  }

  // Calculate total spending for the period
  const totalSpending = chartData.reduce((sum, period) => sum + period.amount, 0)
  const averagePeriod = totalSpending / periods
  
  // Get label for average based on view type
  const averageLabel = viewType === 'weekly' ? 'Weekly Avg' : viewType === 'monthly' ? 'Monthly Avg' : 'Daily Avg'
  const periodLabel = viewType === 'weekly' ? 'Weeks' : viewType === 'monthly' ? 'Months' : 'Days'

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{data.periodFormatted}</p>
          <p className="text-sm text-gray-600">
            Spending: <span className="font-semibold text-error-400">
              {formatCurrency(data.amount)}
            </span>
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200/80 dark:border-gray-600/80 shadow-sm p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
            Spending Trend ({periods} {periodLabel})
          </h2>
          <div className="flex items-center gap-6 text-sm">
            <div>
              <span className="font-medium text-gray-600 dark:text-gray-400">Total: </span>
              <span className="text-error-400 dark:text-error-400 font-bold">
                {formatCurrency(totalSpending)}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-600 dark:text-gray-400">{averageLabel}: </span>
              <span className="text-gray-900 dark:text-gray-100 font-bold">
                {formatCurrency(averagePeriod)}
              </span>
            </div>
          </div>
        </div>
        
        {/* View Type Selector - Enterprise styling */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">View:</label>
          <select
            value={viewType}
            onChange={(e) => setViewType(e.target.value)}
            className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-800 dark:focus:ring-primary-dark focus:border-primary-800 dark:focus:border-primary-dark text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      </div>

      {/* Chart container - responsive */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-600" />
          <XAxis
            dataKey="periodFormatted"
            className="stroke-gray-500 dark:stroke-gray-400"
            fontSize={12}
            tick={{ fill: 'currentColor' }}
            interval="preserveStartEnd"
            angle={viewType === 'monthly' ? -45 : 0}
            textAnchor={viewType === 'monthly' ? 'end' : 'middle'}
            height={viewType === 'monthly' ? 60 : 30}
          />
          <YAxis
            className="stroke-gray-500 dark:stroke-gray-400"
            fontSize={12}
            tick={{ fill: 'currentColor' }}
            tickFormatter={(value) => `$${value.toFixed(0)}`}
          />
          <Tooltip 
            content={<CustomTooltip />}
            contentStyle={{
              backgroundColor: 'transparent',
            }}
          />
          <Legend 
            wrapperStyle={{
              color: 'currentColor',
            }}
          />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#EF4444"
            strokeWidth={2}
            dot={{ fill: '#EF4444', r: 4 }}
            activeDot={{ r: 6 }}
            name={
              viewType === 'weekly'
                ? 'Weekly Spending'
                : viewType === 'monthly'
                ? 'Monthly Spending'
                : 'Daily Spending'
            }
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default SpendingChart


