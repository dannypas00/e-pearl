import type MinecraftLogMessage from '~/types/MinecraftLogMessage';

export default defineEventHandler(
  async (
    event,
  ): Promise<
    { response: Array<MinecraftLogMessage | null> } | { error: string }
  > => {
    const body = await readBody(event);

    try {
      const response: Array<MinecraftLogMessage | null> = (
        await RconSend(body.command)
      ).map((line) => parseLogMessage(line.trim()));

      return { response };
    } catch (e) {
      if (e instanceof RconError) {
        return { error: e.message };
      }

      throw e;
    }
  },
);
