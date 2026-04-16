import { Router } from "express";
import { auth } from "../../middleware/auth.middleware.js";
import * as accountService from "./account.service.js";

const router = Router();

router.get("/details", auth, accountService.getAccountDetails);

export default router;
