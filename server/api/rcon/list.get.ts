import RconError from '~/server/utils/rcon/errors/RconError';

export type RconListResponse = {
  current: number;
  max: number;
  names: string[];
};

export default defineEventHandler(
  async (): Promise<RconListResponse | { error: string }> => {
    try {
      const response = (await RconSend('list'))[0];

      const match = response.match(
        /There are (\d+) of a max of (\d+) players online: (.*)/,
      );
      if (!match) {
        throw new RconError('Invalid response from server');
      }

      const current = Number(match.at(1));
      const max = Number(match.at(2));
      const names = (match.at(3) ?? '').split(', ').filter((name) => name);

      return { current, max, names };
    } catch (e) {
      if (e instanceof RconError) {
        return {
          error: e.message,
        };
      }

      throw e;
    }
  },
);
