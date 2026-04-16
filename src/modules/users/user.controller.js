import { Router } from "express";
import * as userService from "./user.service.js";
import { validation } from "../../middleware/validation.middleware.js";
import { registerSchema, loginSchema } from "./user.validation.js";

const router = Router();

router.post('/register', validation(registerSchema), userService.register);

router.post('/login', validation(loginSchema), userService.login);

export default router;
