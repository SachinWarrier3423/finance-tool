import { NextResponse } from 'next/server'
import mongoose from 'mongoose'
import Expense from '../../../models/Expense'
import connectDB from '../../../lib/mongoose'




// GET request - Fetch all expenses
export async function GET() {
  try {
    await connectDB()
    const expenses = await Expense.find({}).sort({ date: -1 })

    // Always return an array
    return NextResponse.json(Array.isArray(expenses) ? expenses : [])
  } catch (error) {
    console.error('GET /api/expense error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// POST request - Add new expense
export async function POST(request) {
  try {
    await connectDB()
    const body = await request.json()

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json({ error: 'Empty request body' }, { status: 400 })
    }

    const newExpense = await Expense.create(body)
    return NextResponse.json(newExpense)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
