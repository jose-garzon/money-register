import mongoose from 'mongoose'

const ExpensesSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    email: { type: String, required: true },
    tag: { type: String },
    type: { type: String, enum: ['income', 'expense'], required: true },
  },
  { collection: 'expenses' }
)

export default mongoose.models.Expense ||
  mongoose.model('Expense', ExpensesSchema)
