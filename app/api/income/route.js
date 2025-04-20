import connectDB from '../../../lib/mongoose.js';
import Income from '../../../models/Income';

export async function POST(req) {
  await connectDB();

  try {
    const body = await req.json();
    const { name, amount, workType, source, date } = body;

    if (!name || !amount || !workType) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    const income = new Income({
      name,
      amount,
      workType,
      source: source || '',
      date: date || new Date().toISOString(),
    });

    await income.save();

    return new Response(JSON.stringify(income), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function GET() {
  await connectDB();

  const income = await Income.find().sort({ date: -1 });
  return new Response(JSON.stringify(income), { status: 200 });
}
