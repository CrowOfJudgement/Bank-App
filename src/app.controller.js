import express from "express";
import { checkConnectionDB } from "./DB/connectionDB.js";
import { connectRedis } from "./DB/redis/redis.connect.js";
import userRouter from "./modules/users/user.controller.js";
import accountRouter from './modules/accounts/account.controller.js';
import transactionRouter from './modules/transactions/transaction.controller.js';
import dotenv from "dotenv";
import BankAccountModel from "./DB/models/BankAccount.model.js";


import adminRouter from "./modules/admin/admin.controller.js";
dotenv.config();
const app = express();
const port = 3000;

const bootstrap = () => {

    checkConnectionDB();
    connectRedis();
    
    app.use(express.json()); 

    app.get('/', (req, res) => {
        res.status(200).json({ message: 'Welcome to my app' });
    });

app.use('/users', userRouter);
app.use('/accounts', accountRouter);
app.use('/transactions', transactionRouter);

app.use('/admin', adminRouter);

    app.use((req, res) => {
        res.status(404).json({ message: 'Not Found' });
    });

    app.use((err, req, res, next) => {
        const status = typeof err.cause === 'number' ? err.cause : 500;
        res.status(status).json({ 
            success: false,
            message: err.message,
            error: err.message 
        });
    });

    app.listen(port, () => {
        console.log(`🚀 Server is running on port ${port}`);
    });
};

export default bootstrap;
