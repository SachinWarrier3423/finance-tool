"use client"

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import Sidebar from '../components/SideBar';

export default function BudgetingAssistant() {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [budgetCategories, setBudgetCategories] = useState({});
  const [expenseBudget, setExpenseBudget] = useState(0.5);
  const [investmentBudget, setInvestmentBudget] = useState(0.3);
  const [emergencyBudget, setEmergencyBudget] = useState(0.2);

  useEffect(() => {
    // Fetch budget summary and user-defined settings
    const fetchBudgetData = async () => {
      const response = await fetch('/api/budget/summary');
      const data = await response.json();

      if (data.totalIncome && data.totalExpenses) {
        setTotalIncome(data.totalIncome);
        setTotalExpenses(data.totalExpenses);
      }

      // Set user-defined budgets (if available)
      if (data?.budgetCategories) {
        setExpenseBudget(data.budgetCategories.expenseBudget || 0.5);
        setInvestmentBudget(data.budgetCategories.investmentBudget || 0.3);
        setEmergencyBudget(data.budgetCategories.emergencyBudget || 0.2);
      }
    };

    fetchBudgetData();
  }, []);

  const expensePercentage = (totalExpenses / (totalIncome * expenseBudget)) * 100;
  const overspending = totalExpenses > totalIncome * expenseBudget;

  // Handle updating budget settings
  const updateBudgetSettings = async () => {

    await fetch('/api/budget/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ expenseBudget, investmentBudget, emergencyBudget }),
    });

  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center text-black">
      <Sidebar />
      <div className="p-6 space-y-6">
        <h2 className="text-2xl font-bold">📊 Budgeting Assistant</h2>

        {/* Budget Breakdown Card */}
        <Card>
          <CardContent className="space-y-4 pt-4">
            <h3 className="text-xl font-semibold">Monthly Budget Breakdown</h3>
            <ul className="space-y-1">
              <li>💰 Total Income: ₹{totalIncome ? totalIncome.toFixed(2) : '0.00'}</li>
              <li>🧾 Expenses Budget : ₹{(totalIncome * expenseBudget).toFixed(2)}</li>
              <li>📈 Investments : ₹{(totalIncome * investmentBudget).toFixed(2)}</li>
              <li>🛟 Emergency Fund : ₹{(totalIncome * emergencyBudget).toFixed(2)}</li>
            </ul>
          </CardContent>
        </Card>

        {/* Expense Tracker Card */}
        <Card>
          <CardContent className="space-y-4 pt-4">
            <h3 className="text-xl font-semibold">🧮 Expense Tracker</h3>
            <p>Total Expenses: ₹{totalExpenses ? totalExpenses.toFixed(2) : '0.00'}</p>
            <Progress value={expensePercentage} />
            {overspending && (
              <Alert variant="destructive">
                <ExclamationTriangleIcon className="h-4 w-4" />
                <AlertTitle>Budget Alert!</AlertTitle>
                <AlertDescription>
                  You are exceeding your expense budget. Consider reducing spending.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Budget Update Form */}
        <Card>
          <CardContent className="space-y-4 pt-4">
            <h3 className="text-xl font-semibold">Update Budget Settings</h3>
            <input
              type="number"
              value={expenseBudget}
              onChange={(e) => setExpenseBudget(parseFloat(e.target.value))}
              placeholder="Expense Budget Percentage"
            />
            <input
              type="number"
              value={investmentBudget}
              onChange={(e) => setInvestmentBudget(parseFloat(e.target.value))}
              placeholder="Investment Budget Percentage"
            />
            <input
              type="number"
              value={emergencyBudget}
              onChange={(e) => setEmergencyBudget(parseFloat(e.target.value))}
              placeholder="Emergency Fund Percentage"
            />
            <button onClick={updateBudgetSettings} className="btn">
              Save Settings
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
