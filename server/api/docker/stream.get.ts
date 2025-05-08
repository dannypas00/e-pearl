import Docker from 'dockerode';

export default defineEventHandler(async (event) => {
  const docker = new Docker({ socketPath: '/var/run/docker.sock' });
  const containers = await docker.listContainers();
  const minecraftContainer = containers.find(
    (container) =>
      container.State === 'running' && container.Names[0].includes('minecraft'),
  );

  if (!minecraftContainer) {
    setResponseStatus(event, 404, 'No Minecraft container found');
    return null;
  }

  const container = docker.getContainer(minecraftContainer.Id);

  if (!container) {
    setResponseStatus(event, 404, 'Container not found');
    return null;
  }

  setResponseHeader(event, 'Content-Type', 'text/event-stream');

  return await container.logs({
    follow: true,
    stdout: true,
    stderr: true,
    tail: 100,
  });
});
