import { Rcon } from 'rcon-client';

const runtimeConfig = useRuntimeConfig();

export default async function getRconClient() {
  try {
    return await Rcon.connect({
      host: runtimeConfig.minecraft.host as string,
      port: Number(runtimeConfig.rcon.port),
      password: runtimeConfig.rcon.password as string,
    });
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to connect to RCON',
      data: error,
    });
  }
}
