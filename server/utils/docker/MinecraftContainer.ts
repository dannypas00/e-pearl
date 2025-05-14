import Docker from 'dockerode';

export function getDocker(): Docker {
  return new Docker({ socketPath: '/var/run/docker.sock' });
}

export async function getContainers() {
  return await getDocker().listContainers();
}

export async function getMinecraftContainer(includeStopped: boolean = false) {
  const id = (await getContainers()).find(
    (container) =>
      (container.State === 'running' || includeStopped) &&
      container.Names[0].includes('minecraft'),
  )?.Id;

  if (!id) {
    throw createError({ statusCode: 400, statusText: 'Container not found' });
  }

  return getDocker().getContainer(id);
}
