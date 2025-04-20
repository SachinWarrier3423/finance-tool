import mongoose from "mongoose";

const IncomeSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  name: { type: String, required: true }, // Changed from source
  date: { type: Date, required: true },
  workType: { type: String, required: true },
});

export default mongoose.models.Income || mongoose.model("Income", IncomeSchema);
