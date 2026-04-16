import { Router } from "express";
import { auth, isAdmin } from "../../middleware/auth.middleware.js";
import { updateAccountStatus } from "./admin.service.js";
const router = Router();

router.post('/updateAccountStatus', auth, isAdmin, updateAccountStatus);
export default router;
