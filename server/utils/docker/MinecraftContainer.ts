import Docker from 'dockerode';

export function getDocker(): Docker {
  return new Docker({ socketPath: '/var/run/docker.sock' });
}

export async function getContainers() {
  return await getDocker().listContainers();
}

export async function getMinecraftContainer() {
  const id = (await getContainers()).find(
    (container) =>
      container.State === 'running' && container.Names[0].includes('minecraft'),
  )?.Id;

  if (!id) {
    return null;
  }

  return getDocker().getContainer(id);
}
