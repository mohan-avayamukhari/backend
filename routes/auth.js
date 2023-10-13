import express from "express";
import {createUser, updatePsw, login, refreshToken, checkAuthStatus, logout} from "../controllers/auth.js";
import authToken from "../middleware/authToken.js";

const router = express.Router();


router.post("/create", createUser);
router.post('/login', login);
router.post('/logout', logout)
router.post('/token', authToken, refreshToken);
router.post('/check-auth-status', authToken, checkAuthStatus);
router.patch('/changePsw', authToken, updatePsw);

export default router;