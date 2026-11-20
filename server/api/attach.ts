import { attachToContainer } from '~/server/utils/kubernetes/MinecraftContainer';
import { getMinecraftContainer } from '~/server/utils/docker/MinecraftContainer';
import type { Hooks } from 'crossws';
import type { PassThrough } from 'node:stream';
import MinecraftLogMessage from '~/types/MinecraftLogMessage';

let streams: {
  stdin: PassThrough | NodeJS.ReadWriteStream;
  stdout: PassThrough | NodeJS.ReadWriteStream;
  stderr: PassThrough | NodeJS.ReadWriteStream;
};

async function assignStreams() {
  if (useRuntimeConfig().kubernetes) {
    streams = await attachToContainer();
    return;
  }

  const container = await getMinecraftContainer();

  const stream = await container.attach({
    stream: true,
    stdin: true,
    stdout: true,
    stderr: false,
    logs: true,
  });

  streams = { stdin: stream, stdout: stream, stderr: stream };
}

function getCommandLogLine(command: string): MinecraftLogMessage {
  const time = new Date();
  const hours = time.getUTCHours();
  const minutes = time.getUTCMinutes();
  const seconds = time.getUTCSeconds();

  return {
    level: 'E-PEARL',
    message: `> ${command}`,
    user: 'Server thread',
    timestamp: `${hours}:${minutes}:${seconds}`,
  };
}

export default defineWebSocketHandler({
  async open(peer) {
    function handleMessage(data: Buffer) {
      const message = data
        .toString()
        .split('\n')
        .map((line) => parseLogMessage(line))
        .filter((message) => message && !!message.message);

      peer.send(JSON.stringify(message));
    }

    try {
      await assignStreams();

      streams.stdout.on('data', handleMessage);
      streams.stderr.on('data', (data: Buffer) => {
        console.error(data.toString());
      });
    } catch {
      peer.close(undefined, 'Error attaching to container');
    }
  },
  async message(peer, message) {
    if (!streams) {
      console.error('No stream');
      return;
    }

    console.log(getCommandLogLine(message.toString()));
    
    peer.send(JSON.stringify([getCommandLogLine(message.toString())]));
    streams.stdin.write(message.toString() + '\n');
  },
  async close() {
    streams?.stdin.end();
  },
} as Partial<Hooks>);
