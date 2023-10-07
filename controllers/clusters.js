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

const getAllClusters = async (req, res) => {
  try {
    const clusters = await Cluster.find();
    res.status(200).json(clusters.map(cluster => cluster.toJSON()));
  } catch (error) {
    console.error("Error getting clusters:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {addCluster, getAllClusters}