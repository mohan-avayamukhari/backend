import express from "express";
import { addCluster, getAllClusters } from "../controllers/clusters.js";
import authToken from "../middleware/authToken.js";
const router = express.Router()

router.post('/add-cluster', addCluster);
router.get('/get-all', getAllClusters)

export default router;