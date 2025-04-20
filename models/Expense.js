const mongoose = require('mongoose')

const expenseSchema = new mongoose.Schema({
  name: String,
  amount: Number,
  category: String,
  date: Date,
})

module.exports = mongoose.models.Expense || mongoose.model('Expense', expenseSchema)