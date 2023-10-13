import { KubeConfig, CoreV1Api } from '@kubernetes/client-node';

const getPods = async() => {
  const clusterFQDN = 'https://aks-eus-01-dns-bftwl7ft.hcp.eastus.azmk8s.io';
const authToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjF1N2lDc2hjU2h2UDBPby01OS1wX2VJbzNCYmVWRFFScGlMa0dBQjUwT1EifQ.eyJhdWQiOlsiaHR0cHM6Ly9ha3MtZXVzLTAxLWRucy1iZnR3bDdmdC5oY3AuZWFzdHVzLmF6bWs4cy5pbyIsIlwiYWtzLWV1cy0wMS1kbnMtYmZ0d2w3ZnQuaGNwLmVhc3R1cy5hem1rOHMuaW9cIiJdLCJleHAiOjUyOTY5NDU0MjYsImlhdCI6MTY5Njk0OTAyNiwiaXNzIjoiaHR0cHM6Ly9ha3MtZXVzLTAxLWRucy1iZnR3bDdmdC5oY3AuZWFzdHVzLmF6bWs4cy5pbyIsImt1YmVybmV0ZXMuaW8iOnsibmFtZXNwYWNlIjoiZGVmYXVsdCIsInNlcnZpY2VhY2NvdW50Ijp7Im5hbWUiOiJzcnYuc3dpZnQiLCJ1aWQiOiJjODY1NDM5MS0xNmFjLTRhNTgtOGE0MC0yYTM1Y2ZjNGVjZTkifX0sIm5iZiI6MTY5Njk0OTAyNiwic3ViIjoic3lzdGVtOnNlcnZpY2VhY2NvdW50OmRlZmF1bHQ6c3J2LnN3aWZ0In0.iB18Rxu_vqHlkmX01gzRK-PIZwEFiLyd7JMO3V32Cb_vFHk4ZbAgKOx1cDBokncpwOHXiP64HO76OUwdoQkDtpvOZpGTjCYWoIt_GyyIDrkbWzpzOK27fVM-mkaCDgCTbpyb6X718bQo8N33v4LcGEareQLFd7PpBhKIxsDODwOCTLKzjTlZKow3Lz4GXl0aVl4i0cDVeiiJwNlLOltarI37pKl4BK-teyeShZaInHEZG3zKe92cH6s4en0KWN28m55dL7lqkuV_2xh7VSMahWcN1NMvFnjDJ1pO3MZV1ZQoLquKshMEXSMOC6eRzyqJDePZ2RA8yP7heyIT0pZ_7MuYd_eZFzJy2edVUH8OAF2MnBjnzPoUn3fPoK6vH6WYF6WItqNzCFyq4ZXOcJVM0ch3SBTmlz4OhiylEKko7SNwOHNla-wKEnV7gnDlPRA3PTnILh4dMyUBPftqjtX0mIVqMMCKs5zEjaUl3XETrVg6tGx-XiWDmkcI1lMfxHhqVoUmhm0LJea9gf8cBtE-zaa5hGyTTxTtVgHSOkyumAQVAokArSCnhLV3PoB9z5ZEnTMC3AP8hy-NE7RiXg1vovAI08LPySN8v_2X_BFnQwIV__a6GZLxOtPvAXP31PH4aWaA4jOvC3BsQc1kENmK4BAz3O1fDTi_wGVIGdIbUFE';

const kc = new KubeConfig();
kc.loadFromCluster();
kc.getCurrentCluster().server = clusterFQDN;

// Set the token directly in the request headers
kc.applyToRequest({ headers: { authorization: `Bearer ${authToken}` } });

const k8sApi = kc.makeApiClient(CoreV1Api);

// Now you can make requests to the cluster
try {
  const response = await k8sApi.listNamespacedPod('default');
  console.log(response.body);
} catch (err) {
  console.error('Error fetching pods:', err.response ? err.response.body : err.message);
}
};

export {getPods}
