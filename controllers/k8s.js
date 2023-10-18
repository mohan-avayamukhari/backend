import { CoreV1Api, Version } from "../components/kubConfig.js";

const getVersion = async(req, res) => {
  try {
    const k8sApi = Version(req.options);
    const response = (await k8sApi.getCode()).body;
    res.status(200).json(response.gitVersion);
  } catch (error){
    if (error.code === 'ETIMEDOUT') {
      console.error('Request timed out:', error.message);
      res.status(504).json({ error: 'Gateway Timeout' });
    }
    else if(error.code === 'ENOTFOUND'){
      console.error('Invalid FQDN or IP:', error.message);
      res.status(404).json({ error: 'Invalid Cluster' });
    } else if (error.code === 401) {
      console.error('Authentication error:', error.message);
      res.status(401).json({ error: 'Unauthorized' });
    } else {
      console.error('Internal Server Error:', error.code);
      res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
  }
}

const allResources = async (req, res) => {
  try {
    const k8sApi = CoreV1Api(req.options);
    const response = (await k8sApi.getAPIResources()).body.resources;
    const resourcesNamespaced = response.filter(resource => resource.namespaced).map(item => item.kind)
    res.status(200).json(resourcesNamespaced)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

export { getVersion, allResources };
