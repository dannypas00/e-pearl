import { getMinecraftContainer } from '~/server/utils/docker/MinecraftContainer';
import type { Hooks } from 'crossws';

let stream: NodeJS.ReadWriteStream | undefined;

export default defineWebSocketHandler({
  async open(peer) {
    try {
      const container = await getMinecraftContainer();

      stream = await container.attach({
        stream: true,
        stdin: true,
        stdout: true,
        stderr: false,
        logs: true,
      });

      stream.on('data', (data: Buffer) => {
        const message = data
          .toString()
          .split('\n')
          .map((line) => parseLogMessage(line))
          .filter((message) => message && !!message.message);

        peer.send(JSON.stringify(message));
      });
    } catch {
      peer.close(undefined, 'Error attaching to container');
    }
  },
  async message(peer, message) {
    const command = message.toString() + '\n';

    if (!stream) {
      console.error('No stream');
      return;
    }

    stream.write(command);
  },
  async close() {
    stream?.end();
  },
} as Partial<Hooks>);
