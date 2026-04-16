import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../../DB/models/user.model.js";
import accountModel from "../../DB/models/BankAccount.model.js";
export const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const hashPassword = bcrypt.hashSync(password, 8);

    const user = await userModel.create({
      fullName,
      email,
      password: hashPassword,
    });

    try {
      const accountNumber =
        "AC" +
        Date.now().toString().slice(-8) +
        Math.floor(Math.random() * 9000 + 1000);
      const account = await accountModel.create({
        userId: user._id,
        accountNumber,
        balance: 0,
      });
      return res
        .status(201)
        .json({
          success: true,
          message: "User created",
          userId: user._id,
          accountId: account._id,
        });
    } catch (accErr) {
      return res
        .status(201)
        .json({
          success: true,
          message: "User created (account creation failed)",
          userId: user._id,
          accountError: accErr.message,
        });
    }
  } catch (error) {
    if (error && error.code === 11000) {
      return res.status(409).json({ message: "Email already exists" });
    }

    return res.status(500).json({ message: error.message || "Error" });
  }
};
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return next(new Error("Invalid email or password"));
  }

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET || "ay 7aga",
    { expiresIn: "1d" },
  );

  return res.status(200).json({
    message: "Login successful",
    token,
  });
};
