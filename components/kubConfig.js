import k8s from "@kubernetes/client-node";

const kc = new k8s.KubeConfig();

const CoreV1Api = (options) => {
  kc.loadFromOptions(options);
  return kc.makeApiClient(k8s.CoreV1Api);
};

const Version = (options) => {
  kc.loadFromOptions(options);
  return kc.makeApiClient(k8s.VersionApi)
}

export { CoreV1Api, Version };
