import express from "express";
import authToken from "../middleware/authToken.js";
import { getPods } from "../controllers/k8s.js";
const router = express.Router()

router.get('/pods', getPods)

export default router;