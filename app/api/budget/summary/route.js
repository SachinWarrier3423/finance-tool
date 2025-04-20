import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/mongoose';
import { startOfMonth, endOfMonth } from 'date-fns';

export async function GET() {
  try {
    const db = await connectDB();

    // Access the correct collections
    const incomesCollection = db.collection('incomes');
    const expensesCollection = db.collection('expenses');

    // Get the start and end of the current month
    const startOfCurrentMonth = startOfMonth(new Date());
    const endOfCurrentMonth = endOfMonth(new Date());

    // Aggregate total income for the current month
    const incomeTotalAgg = await incomesCollection.aggregate([
      {
        $match: {
          date: { $gte: startOfCurrentMonth, $lte: endOfCurrentMonth },  // Filter for current month
        },
      },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]).toArray();

    // Aggregate total expenses for the current month
    const expenseTotalAgg = await expensesCollection.aggregate([
      {
        $match: {
          date: { $gte: startOfCurrentMonth, $lte: endOfCurrentMonth },  // Filter for current month
        },
      },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]).toArray();

    // Extract totals or default to 0 if no records exist
    const totalIncome = incomeTotalAgg.length > 0 ? incomeTotalAgg[0]?.total : 0;
    const totalExpenses = expenseTotalAgg.length > 0 ? expenseTotalAgg[0]?.total : 0;

    // Send the response
    return NextResponse.json({ totalIncome, totalExpenses });
  } catch (err) {
    console.error('Error in /api/budget/summary:', err.stack);
    return NextResponse.json({ error: 'Failed to fetch budget summary' }, { status: 500 });
  }
}
