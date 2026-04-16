import accountModel from '../../DB/models/BankAccount.model.js';
import mongoose from 'mongoose';
export const getAccountDetails = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.user._id);
        const account = await accountModel.findOne({ userId: userId });
        
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }
        return res.status(200).json(account);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};