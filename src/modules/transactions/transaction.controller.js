import { Router } from 'express';
import { auth } from '../../middleware/auth.middleware.js';
import * as transactionService from './transaction.service.js';
import { getTransactionById } from './transaction.service.js';
const router = Router();

router.post('/deposit', auth, transactionService.deposit);
router.post('/withdraw', auth, transactionService.withdraw);
router.get('/history', auth, transactionService.getAccountTransactions);
router.get('/:id', auth, getTransactionById);
export default router;