/**
 * Expense Chart Component
 * 
 * Purpose: Display expense breakdown by category as a pie chart
 * 
 * Key Concepts Demonstrated:
 * - Chart integration (Recharts - free library)
 * - Data transformation for charts
 * - Responsive chart sizing
 * 
 * Free Tools Used:
 * - Recharts: Free, open-source React charting library
 * - getCategoryBreakdown: Free utility function
 * 
 * Usage:
 * <ExpenseChart />
 */

'use client'

import { useTransactions } from '../../hooks/useTransactions'
import { useBudget } from '../../context/BudgetContext'
import { getCategoryBreakdown } from '../../utils/calculations'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

/**
 * Expense breakdown chart component
 * 
 * Features:
 * - Pie chart showing expenses by category
 * - Color-coded segments
 * - Interactive tooltips
 * - Responsive sizing
 */
const ExpenseChart = () => {
  const { transactions } = useTransactions()
  const { categories } = useBudget()

  // Get current month's date range
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)

  // Calculate breakdown for current month
  // Safety check: ensure arrays exist
  const breakdown = Array.isArray(transactions) && Array.isArray(categories)
    ? getCategoryBreakdown(
        transactions,
        categories,
        startOfMonth,
        endOfMonth
      )
    : []

  // If no expenses, show empty state
  if (breakdown.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200/80 dark:border-gray-600/80 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Expense Breakdown
        </h2>
        <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
          <p className="font-medium">No expenses this month</p>
        </div>
      </div>
    )
  }

  // Prepare data for chart
  // Recharts expects: [{ name, value, ...other }]
  const chartData = breakdown.map((item) => ({
    name: item.categoryName,
    value: item.amount,
    percentage: item.percentage,
    color: item.categoryColor,
  }))

  // Custom label function - shows percentage
  const renderLabel = (entry) => {
    return `${entry.percentage}%`
  }

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0]
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{data.name}</p>
          <p className="text-sm text-gray-600">
            ${data.value.toFixed(2)} ({data.payload.percentage}%)
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200/80 dark:border-gray-600/80 shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">
        Expense Breakdown
      </h2>

      {/* Chart container - responsive */}
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {/* Color each segment based on category color */}
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value, entry) => (
              <span style={{ color: entry.color }}>{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ExpenseChart

