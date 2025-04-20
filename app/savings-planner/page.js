"use client";

import React, { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import SideBar from "../components/SideBar";

export default function SavingsPlanner() {
  const [quizAnswer, setQuizAnswer] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [sipAmount, setSipAmount] = useState("");
  const [sipYears, setSipYears] = useState("");
  const [sipReturn, setSipReturn] = useState("");
  const [growthData, setGrowthData] = useState([]);
  const [futureValue, setFutureValue] = useState(null);

  const handleQuizSubmit = () => {
    let suggestionsList = [];

    if (quizAnswer === "low") {
      suggestionsList = ["Public Provident Fund (PPF)", "Fixed Deposit (FD)", "National Savings Certificate (NSC)"];
    } else if (quizAnswer === "medium") {
      suggestionsList = ["Balanced Mutual Funds", "Index Funds", "Large Cap Mutual Funds"];
    } else if (quizAnswer === "high") {
      suggestionsList = ["Equity Mutual Funds", "Stocks", "Systematic Investment Plans (SIPs)"];
    }

    setSuggestions(suggestionsList);
  };

  const calculateSIP = () => {
    const P = parseFloat(sipAmount);
    const N = parseInt(sipYears);
    const annualReturn = parseFloat(sipReturn);

    if (isNaN(P) || isNaN(N) || isNaN(annualReturn) || P <= 0 || N <= 0 || annualReturn <= 0) {
      alert("Please enter valid SIP values.");
      return;
    }

    const r = annualReturn / 100 / 12; // monthly rate
    const n = N * 12;

    const FV = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    setFutureValue(FV.toFixed(2));

    const data = [];
    for (let year = 1; year <= N; year++) {
      const months = year * 12;
      const value = P * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);
      data.push({ year: `Year ${year}`, value: parseFloat(value.toFixed(2)) });
    }
    setGrowthData(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center text-black">
      {/* Sidebar */}
      <SideBar />
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">💸 Savings Planner</h1>

      {/* Risk Quiz */}
      <div className="p-4 border rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2">🧠 Risk Level Quiz</h2>
        <p className="mb-2">How would you describe your investment style?</p>
        <div className="space-x-4">
          <button
            onClick={() => setQuizAnswer("low")}
            className={`px-4 py-2 rounded-xl ${quizAnswer === "low" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Low (Safe)
          </button>
          <button
            onClick={() => setQuizAnswer("medium")}
            className={`px-4 py-2 rounded-xl ${quizAnswer === "medium" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Medium
          </button>
          <button
            onClick={() => setQuizAnswer("high")}
            className={`px-4 py-2 rounded-xl ${quizAnswer === "high" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            High (Aggressive)
          </button>
        </div>
        <button
          onClick={handleQuizSubmit}
          className="mt-4 bg-black text-white px-4 py-2 rounded-xl"
        >
          Get Suggestions
        </button>

        {suggestions.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold mb-1">Suggested Investment Options:</h3>
            <ul className="list-disc list-inside">
              {suggestions.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* SIP Calculator */}
      <div className="p-4 border rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2">📈 SIP Calculator</h2>
        <div className="space-y-2">
          <input
            type="number"
            placeholder="Monthly Investment (₹)"
            value={sipAmount}
            onChange={(e) => setSipAmount(e.target.value)}
            className="w-full p-2 rounded-xl border"
          />
          <input
            type="number"
            placeholder="Investment Duration (Years)"
            value={sipYears}
            onChange={(e) => setSipYears(e.target.value)}
            className="w-full p-2 rounded-xl border"
          />
          <input
            type="number"
            placeholder="Expected Annual Return (%)"
            value={sipReturn}
            onChange={(e) => setSipReturn(e.target.value)}
            className="w-full p-2 rounded-xl border"
          />
          <button
            onClick={calculateSIP}
            className="bg-green-600 text-white px-4 py-2 rounded-xl"
          >
            Calculate Growth
          </button>
        </div>

        {futureValue && (
          <div className="mt-4">
            <h3 className="font-semibold text-lg">
              Projected Value: ₹{parseFloat(futureValue).toLocaleString("en-IN")}
            </h3>
            <div className="h-64 mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={growthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#3b82f6"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}
