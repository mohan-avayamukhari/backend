import Cluster from '../models/clusterModel.js';
import { decryptToken } from "../components/decrypt.js";

const k8sDetails = async (req, res, next) => {
  try {
    const clusterId = req.params.id;
    const cluster = await Cluster.findById(clusterId);
    const fqdn = `${cluster.fqdnIp}:${cluster.port}`;
    const hashToken = cluster.hashToken;
    const iv = cluster.tokenIv;

    const token = decryptToken(hashToken, iv);

    const options = ({
      clusters: [{
        name: cluster.clusterName,
        server: fqdn,
        skipTLSVerify: true,
      }],
      users: [{
        name: req.user.name,
        token: token,
      }],
      contexts: [{
        name: cluster.clusterName,
        user: req.user.name,
        cluster: cluster.clusterName,
      }],
      currentContext: cluster.clusterName,
    });
    req.cluster = cluster;
    req.options = options;

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

export default k8sDetails;
