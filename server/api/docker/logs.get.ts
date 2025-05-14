import { parseLogMessage } from '~/server/utils/rcon/LogParser';
import { getMinecraftContainer } from '~/server/utils/docker/MinecraftContainer';

export default defineEventHandler(async (event) => {
  const container = await getMinecraftContainer();

  if (!container) {
    setResponseStatus(event, 404, 'Container not found');
    return null;
  }

  setResponseHeader(event, 'cache-control', 'no-cache');
  setResponseHeader(event, 'connection', 'keep-alive');
  setResponseHeader(event, 'Content-Type', 'text/event-stream');

  const eventStream = createEventStream(event);
  let stream;

  try {
    stream = await container.logs({
      follow: true,
      stdout: true,
      stderr: true,
      tail: 100,
    });
  } catch (error) {
    console.error('Error starting log stream:', error);
    setResponseStatus(event, 500, 'Internal Server Error');
    return null;
  }

  stream.on('data', async (buffer: Buffer) => {
    const message = buffer.toString();
    const formattedMessages = parseLogMessage(message.trim());

    if (formattedMessages) {
      await eventStream.push(JSON.stringify(formattedMessages));
    }
  });

  // cleanup the interval and close the stream when the connection is terminated
  eventStream.onClosed(async () => {
    console.log('closing SSE...');
    stream.removeAllListeners();
    await eventStream.close();
  });

  return eventStream.send();
});
