'use client'

import { useEffect, useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'

import SideBar from '../components/SideBar'

export default function Page() {
  const [incomeList, setIncomeList] = useState([])
  const [totalIncome, setTotalIncome] = useState(0)
  const [monthlyData, setMonthlyData] = useState([])
  const [averageIncome, setAverageIncome] = useState(0)
  const [income, setIncome] = useState({
    name: '',
    amount: '',
    workType: '',
    date: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch('/api/income', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(income),
    })
    if (response.ok) {
      // Fetch the updated income list
      fetch('/api/income')
        .then(res => res.json())
        .then(data => {
          setIncomeList(data)
          const total = data.reduce((sum, entry) => sum + entry.amount, 0)
          setTotalIncome(total)

          // Monthly aggregation
          const grouped = {}
          data.forEach(entry => {
            const month = new Date(entry.date).toLocaleString('default', { month: 'short', year: 'numeric' })
            if (!grouped[month]) grouped[month] = 0
            grouped[month] += entry.amount
          })

          // Sort the months chronologically
          const monthly = Object.entries(grouped).map(([month, value]) => ({
            month,
            income: value,
          }))

          // Sort by month using a custom sort order
          const monthsOrder = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
          ]
          const sortedMonthly = monthly.sort((a, b) => {
            const aMonthIndex = monthsOrder.indexOf(a.month.split(' ')[0])
            const bMonthIndex = monthsOrder.indexOf(b.month.split(' ')[0])
            return aMonthIndex - bMonthIndex
          })

          setMonthlyData(sortedMonthly)

          setAverageIncome(monthly.length > 0 ? total / monthly.length : 0)
        })
    }
  }

  useEffect(() => {
    fetch('/api/income')
      .then(res => res.json())
      .then(data => {
        setIncomeList(data)

        const total = data.reduce((sum, entry) => sum + entry.amount, 0)
        setTotalIncome(total)

        // Monthly aggregation
        const grouped = {}
        data.forEach(entry => {
          const month = new Date(entry.date).toLocaleString('default', { month: 'short', year: 'numeric' })
          if (!grouped[month]) grouped[month] = 0
          grouped[month] += entry.amount
        })

        // Sort the months chronologically
        const monthly = Object.entries(grouped).map(([month, value]) => ({
          month,
          income: value,
        }))

        // Sort by month using a custom sort order
        const monthsOrder = [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ]
        const sortedMonthly = monthly.sort((a, b) => {
          const aMonthIndex = monthsOrder.indexOf(a.month.split(' ')[0])
          const bMonthIndex = monthsOrder.indexOf(b.month.split(' ')[0])
          return aMonthIndex - bMonthIndex
        })

        setMonthlyData(sortedMonthly)

        setAverageIncome(monthly.length > 0 ? total / monthly.length : 0)
      })
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center text-black">
      {/* Sidebar */}
      <SideBar />

      {/* Main content area */}
      <div className="flex-1 ml-64 p-6">
        <div className="max-w-7xl w-full flex flex-col lg:flex-row gap-8">
          {/* Left Side: Form and Income List */}
          <div className="w-full lg:w-1/2 bg-white p-6 rounded-2xl shadow">
            <h1 className="text-2xl font-bold mb-6">Income Tracker</h1>

            {/* Income Form */}
            <form onSubmit={handleSubmit} className="space-y-4 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Source</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={income.name}
                  onChange={(e) => setIncome({ ...income, name: e.target.value })}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={income.amount}
                  onChange={(e) => setIncome({ ...income, amount: e.target.value })}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label htmlFor="workType" className="block text-sm font-medium text-gray-700">Work Type</label>
                <input
                  type="text"
                  id="workType"
                  name="workType"
                  value={income.workType}
                  onChange={(e) => setIncome({ ...income, workType: e.target.value })}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={income.date}
                  onChange={(e) => setIncome({ ...income, date: e.target.value })}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  required
                />
              </div>
              <button type="submit" className="w-full mt-4 py-2 bg-blue-500 text-white font-semibold rounded-md">Add Income</button>
            </form>

            {/* Income List */}
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Source</th>
                  <th className="border px-4 py-2">Amount</th>
                  <th className="border px-4 py-2">Date</th>
                  <th className="border px-4 py-2">Work Type</th>
                </tr>
              </thead>
              <tbody>
                {incomeList.map((income, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{income.name}</td>
                    <td className="border px-4 py-2">₹{income.amount}</td>
                    <td className="border px-4 py-2">{new Date(income.date).toLocaleDateString()}</td>
                    <td className="border px-4 py-2">{income.workType}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Right Side: Dashboard Stats */}
          <div className="w-full lg:w-1/2 bg-white p-6 rounded-2xl shadow">
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-white p-4 rounded-2xl shadow">
                <h2 className="text-lg font-semibold">Total Earnings</h2>
                <p className="text-2xl font-bold mt-2">₹{totalIncome.toFixed(2)}</p>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow">
                <h2 className="text-lg font-semibold">Average Monthly Income</h2>
                <p className="text-2xl font-bold mt-2">₹{averageIncome.toFixed(2)}</p>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow">
                <h2 className="text-lg font-semibold">Total Entries</h2>
                <p className="text-2xl font-bold mt-2">{incomeList.length}</p>
              </div>
            </div>

            {/* Monthly Chart */}
            <div className="bg-white p-6 rounded-2xl shadow">
              <h2 className="text-lg font-semibold mb-4">Monthly Earnings</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="income" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
