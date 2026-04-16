import accountModel from '../../DB/models/BankAccount.model.js';
import transactionModel from '../../DB/models/Transaction.model.js';

export const deposit = async (req, res) => {
    const { amount } = req.body;
    const account = await accountModel.findOne({ userId: req.user._id });

    if (!account) return res.status(404).json({ message: "Account not found" });

    const balanceBefore = account.balance;
    account.balance = account.balance + amount;
    await account.save();

    const transaction = await transactionModel.create({
        accountId: account._id,
        type: 'deposit',
        amount,
        balanceBefore,
        balanceAfter: account.balance
    });
    

    return res.status(200).json({message: "Deposit successful", transaction });
};

export const withdraw = async (req, res) => {
    const { amount } = req.body;
    const account = await accountModel.findOne({ userId: req.user._id });

    if (!account) return res.status(404).json({ message: "Account not found" });
    if (account.balance < amount) return res.status(400).json({ message: "not enough money" });

    const balanceBefore = account.balance;
    account.balance = account.balance - amount;
    await account.save();

    const transaction = await transactionModel.create({
        accountId: account._id,
        type: 'withdraw',
        amount,
        balanceBefore,
        balanceAfter: account.balance
    });

   

    return res.status(200).json({message: "Withdrawal successful", transaction });
};

export const getAccountTransactions = async (req, res) => {
    try {
        const account = await accountModel.findOne({ userId: req.user._id });

        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }

        const transactions = await transactionModel.find({ accountId: account._id })
            .sort({ createdAt: -1 });

        return res.status(200).json({ transactions });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export const getTransactionById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const account = await accountModel.findOne({ userId });
        if (!account) return res.status(404).json({ message: "Account not found" });

        const transaction = await transactionModel.findOne({ 
            _id: id, 
            accountId: account._id 
        });

        if (!transaction) return res.status(404).json({ message: "Transaction not found" });

        return res.status(200).json({ transaction });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};