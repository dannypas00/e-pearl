import type MinecraftLogMessage from '~/types/MinecraftLogMessage';
import { getMinecraftContainer } from '~/server/utils/docker/MinecraftContainer';

export default defineEventHandler(async (event): Promise<void> => {
  const body = await readBody(event);

  const container = await getMinecraftContainer();

  container?.attach({
    stdin: true,
  });
});
