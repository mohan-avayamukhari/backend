import express from "express";
import { addCluster, updateCluster, getAllClusters, deleteCluster, updateClusterSeverity, changeToken } from "../controllers/clusters.js";
import authToken from "../middleware/authToken.js";
const router = express.Router()

router.post('/add-cluster',authToken, addCluster);
router.get('/get-all', authToken, getAllClusters);
router.delete('/:id', authToken, deleteCluster);
router.put('/:id', authToken, updateCluster);
router.patch('/severity/:id',authToken, updateClusterSeverity);
router.patch('/token/:id',authToken, changeToken)

export default router;