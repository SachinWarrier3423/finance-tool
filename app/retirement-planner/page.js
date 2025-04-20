"use client";

import React, { useState } from "react";
import SideBar from '../components/SideBar'

export default function RetirementPlanner() {
  const [currentAge, setCurrentAge] = useState("");
  const [retirementAge, setRetirementAge] = useState("");
  const [monthlyExpense, setMonthlyExpense] = useState("");
  const [currentSavings, setCurrentSavings] = useState("");
  const [inflation, setInflation] = useState("");
  const [retirementCorpus, setRetirementCorpus] = useState(null);
  const [progress, setProgress] = useState(null);

  const calculateRetirementCorpus = () => {
    const ageNow = parseInt(currentAge);
    const retireAt = parseInt(retirementAge);
    const expense = parseFloat(monthlyExpense);
    const savings = parseFloat(currentSavings);
    const inflationRate = parseFloat(inflation) / 100;

    if (
      isNaN(ageNow) || isNaN(retireAt) || isNaN(expense) ||
      isNaN(savings) || isNaN(inflationRate) ||
      ageNow <= 0 || retireAt <= ageNow || expense <= 0 || savings < 0
    ) {
      alert("Please fill valid values.");
      return;
    }

    const yearsUntilRetirement = retireAt - ageNow;
    const yearsInRetirement = 85 - retireAt;

    const adjustedAnnualExpense = expense * 12 * Math.pow(1 + inflationRate, yearsUntilRetirement);
    const corpus = adjustedAnnualExpense * yearsInRetirement;

    setRetirementCorpus(corpus.toFixed(2));

    const percentage = Math.min((savings / corpus) * 100, 100).toFixed(1);
    setProgress(percentage);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center text-black">
      {/* Sidebar */}
      <SideBar />
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">👴 Retirement Planner</h1>

      <div className="space-y-4 p-4 border rounded-xl shadow">
        <input
          type="number"
          placeholder="Current Age"
          value={currentAge}
          onChange={(e) => setCurrentAge(e.target.value)}
          className="w-full p-2 rounded-xl border"
        />
        <input
          type="number"
          placeholder="Desired Retirement Age"
          value={retirementAge}
          onChange={(e) => setRetirementAge(e.target.value)}
          className="w-full p-2 rounded-xl border"
        />
        <input
          type="number"
          placeholder="Current Monthly Expense (₹)"
          value={monthlyExpense}
          onChange={(e) => setMonthlyExpense(e.target.value)}
          className="w-full p-2 rounded-xl border"
        />
        <input
          type="number"
          placeholder="Current Retirement Savings (₹)"
          value={currentSavings}
          onChange={(e) => setCurrentSavings(e.target.value)}
          className="w-full p-2 rounded-xl border"
        />
        <input
          type="number"
          placeholder="Expected Inflation Rate (%)"
          value={inflation}
          onChange={(e) => setInflation(e.target.value)}
          className="w-full p-2 rounded-xl border"
        />

        <button
          onClick={calculateRetirementCorpus}
          className="bg-black text-white px-4 py-2 rounded-xl w-full"
        >
          Calculate Retirement Needs
        </button>
      </div>

      {retirementCorpus && (
        <div className="p-4 border rounded-xl shadow space-y-4">
          <h2 className="text-xl font-semibold">
            🧾 Estimated Corpus Needed: ₹{parseFloat(retirementCorpus).toLocaleString("en-IN")}
          </h2>
          <div>
            <p className="mb-1">Progress Towards Goal: {progress}%</p>
            <div className="w-full bg-gray-200 h-6 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
