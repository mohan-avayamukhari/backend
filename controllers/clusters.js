import Cluster from "../models/clusterModel.js";

const addCluster = async(req, res) => {
  try{
    const newCluster = new Cluster({
      clusterName: req.body.clusterName,
      fqdnIp: req.body.fqdnIp,
      port: req.body.port,
      token: req.body.token
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
    Object.assign(cluster, req.body);
    await cluster.save();
    res.status(200).json(cluster.toJSON());
  } catch (error) {
    console.error('Error updating cluster:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getAllClusters = async (req, res) => {
  try {
    const clusters = await Cluster.find();
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


export {addCluster, updateCluster, getAllClusters, deleteCluster}