import express from "express";
import authToken from "../middleware/authToken.js";
import { allResources, getVersion } from "../controllers/k8s.js";
import k8s from "../middleware/k8sDetails.js";
const router = express.Router()


router.get('/version/:id', authToken, k8s, getVersion);
router.get('/all-resources/:id',authToken, k8s, allResources);

export default router;