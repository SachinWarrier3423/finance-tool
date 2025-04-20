import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/mongoose';

export async function PUT(request) {
  try {
    const db = await connectDB();
    const { expenseBudget, investmentBudget, emergencyBudget } = await request.json();
    // expenseBudget = expenseBudget/100;
    // investmentBudget = investmentBudget/100;
    // emergencyBudget = emergencyBudget/100;

    // Update the budget settings in the database
    await db.collection('budgetSettings').updateOne(
      {},
      {
        $set: {
          expenseBudget,
          investmentBudget,
          emergencyBudget,
        },
      },
      { upsert: true }
    );

    return NextResponse.json({ message: 'Budget settings updated successfully' });
  } catch (err) {
    console.error('Error in PUT /api/budget/settings:', err);
    return NextResponse.json({ error: 'Failed to update budget settings' }, { status: 500 });
  }
}
