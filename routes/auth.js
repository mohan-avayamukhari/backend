import express from "express";
import {createUser, login, refreshToken, checkAuthStatus} from "../controllers/auth.js";
import authToken from "../middleware/authToken.js";

const router = express.Router();


router.post("/create", createUser);
router.post('/login', login)
router.post('/token', authToken, refreshToken)
router.get('/check-auth-status', authToken, checkAuthStatus);

export default router;