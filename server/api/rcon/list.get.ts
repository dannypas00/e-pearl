import RconError from '~/server/utils/rcon/errors/RconError';

export default defineEventHandler(async () => {
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
    const names = match.at(3)?.split(', ');

    return {
      current,
      max,
      names,
    };
  } catch (e) {
    if (e instanceof RconError) {
      return {
        error: e.message,
      };
    }

    throw e;
  }
});
