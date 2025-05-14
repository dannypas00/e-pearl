import { getMinecraftContainer } from '~/server/utils/docker/MinecraftContainer';
import type { Hooks } from 'crossws';

export default defineWebSocketHandler({
  async open(peer) {
    console.log('WebSocket connection opened:', peer.id);
    peer.context.container = await getMinecraftContainer();
    if (!peer.context.container) {
      console.error('Container not found');
      peer.close(404, 'Container not found');
      return;
    }
  },
  async message(peer, message) {
    console.log(message.toString());
    if (!peer.context.container) {
      console.log('No container');
      return;
    }

    const command = message.toString() + '\n';
    const container = await getMinecraftContainer();
    const stream: NodeJS.ReadWriteStream | undefined = await container?.attach({
      stream: true,
      stdin: true,
      stdout: false,
      stderr: false,
      hijack: true,
      logs: true,
    });

    if (!stream) {
      console.error('No stream');
      return;
    }

    const success = stream.write(command, (err) => console.error(err));
    console.log(success);

    stream.end();
  },
} as Partial<Hooks>);
