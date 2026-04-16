import accountModel from "../../DB/models/BankAccount.model.js";
import userModel from "../../DB/models/user.model.js";
export const updateAccountStatus = async (req, res) => {
    try {
        const { accountId: bodyAccountId, status } = req.body;
        const accountId = bodyAccountId || req.params.accountId;

        if (!['active', 'frozen'].includes(status)) {
            return res.status(400).json({ message: "Status must be either 'active' or 'frozen'" });
        }

        const account = await accountModel.findByIdAndUpdate(
            accountId,
            { status },
            { new: true }
        );

        if (!account) return res.status(404).json({ message: "Account not found" });

        return res.status(200).json({ message: `Account is now ${status}`, account });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};