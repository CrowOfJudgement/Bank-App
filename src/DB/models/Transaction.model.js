import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'BankAccount', required: true },
  type: { type: String, enum: ['deposit', 'withdraw'], required: true }, 
  amount: { type: Number, required: true }, 
  balanceBefore: { type: Number, required: true }, 
  balanceAfter: { type: Number, required: true }, 
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'completed' } 
}, { timestamps: true });

export default mongoose.model('Transaction', transactionSchema);