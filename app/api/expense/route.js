import { NextResponse } from 'next/server'
import mongoose from 'mongoose'
import Expense from '../../../models/Expense'

const MONGO_URI = process.env.MONGO_URI

// Connect to MongoDB
const connectDB = async () => {
  if (mongoose.connections[0].readyState === 1) return
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}

export async function GET() {
  try {
    await connectDB()
    const expenses = await Expense.find({}).sort({ date: -1 })
    return NextResponse.json(expenses)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    await connectDB()
    const body = await request.json()
    const newExpense = await Expense.create(body)
    return NextResponse.json(newExpense)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
