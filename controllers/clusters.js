import Cluster from "../models/clusterModel.js";
import { encryptToken } from "../components/encrypt.js";

const addCluster = async(req, res) => {
  try{
    const secureToken = encryptToken(req.body.serviceToken)
    const newCluster = new Cluster({
      clusterName: req.body.clusterName,
      fqdnIp: req.body.fqdnIp,
      port: req.body.port,
      severity: "",
      hashToken: secureToken.encryptedToken,
      tokenIv: secureToken.iv
    });

    await newCluster.save();

    res.status(201).json(newCluster.toJSON());
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

const updateCluster = async (req, res) => {
  try {
    const clusterId = req.params.id;
    const cluster = await Cluster.findById(clusterId);
    if (!cluster) {
      return res.status(404).json({ error: 'Cluster not found' });
    }
    
    cluster.clusterName = req.body.clusterName;
    cluster.fqdnIp = req.body.fqdnIp;
    cluster.port = req.body.port;
    cluster.severity = ""

    await cluster.save();
    res.status(200).json(cluster.toJSON());
  } catch (error) {
    console.error('Error updating cluster:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const changeToken = async (req, res) => {
  try{
  const clusterId = req.params.id;
  const secureToken = encryptToken(req.body.serviceToken)

  const cluster = await Cluster.findById(clusterId)
  if (!cluster) {
    return res.status(404).json({ error: "Cluster not found" });
  }
  cluster.hashToken = secureToken.encryptedToken;
  cluster.tokenIv = secureToken.iv
    await cluster.save();
    res.status(200).end()
  }catch(error){
    console.error("Error updating service token:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

const updateClusterSeverity = async (req, res) => {
  try {
    const clusterId = req.params.id;
    const newSeverity = req.body.severity;

    const cluster = await Cluster.findById(clusterId);

    if (!cluster) {
      return res.status(404).json({ error: "Cluster not found" });
    }

    cluster.severity = newSeverity;
    await cluster.save();

    res.status(200).json(cluster.toJSON());
  } catch (error) {
    console.error("Error updating cluster severity:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



const getAllClusters = async (req, res) => {
  try {
    const clusters = await Cluster.find({}, 'id clusterName fqdnIp port severity');
    res.status(200).json(clusters.map(cluster => cluster.toJSON()));
  } catch (error) {
    console.error("Error getting clusters:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteCluster = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Cluster.deleteOne({ _id: id});
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Cluster not found' });
    }
    res.status(200).end();
  } catch (error) {
    console.error('Error deleting cluster:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export {addCluster, updateCluster,changeToken, updateClusterSeverity, getAllClusters, deleteCluster}