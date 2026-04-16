import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  accountNumber: { type: String, required: true, unique: true },
  balance: { type: Number, default: 0 }, 
  currency: { type: String, default: 'EGP' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['active', 'frozen', 'inactive'], default: 'active' } 
}, { timestamps: true });

export default mongoose.model('BankAccount', accountSchema);