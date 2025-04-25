export default defineEventHandler(
  async (event): Promise<{ response: string[] } | { error: string }> => {
    const body = await readBody(event);

    try {
      const response = await RconSend(body.command);

      return { response };
    } catch (e) {
      if (e instanceof RconError) {
        return { error: e.message };
      }

      throw e;
    }
  },
);
