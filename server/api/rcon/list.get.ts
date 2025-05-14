export type RconListResponse = {
  current: number;
  max: number;
  names: string[];
};

export default defineEventHandler(
  async (): Promise<RconListResponse | { error: string }> => {
    const response = (await RconSend('list'))[0];

    const match = response.match(
      /There are (\d+) of a max of (\d+) players online: (.*)/,
    );

    if (!match) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Invalid response from server',
      });
    }

    const current = Number(match.at(1));
    const max = Number(match.at(2));
    const names = (match.at(3) ?? '').split(', ').filter((name) => name);

    return { current, max, names };
  },
);
