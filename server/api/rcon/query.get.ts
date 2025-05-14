import serverUtils from 'minecraft-server-util';

export default defineEventHandler(async () => {
  try {
    return await serverUtils.status(
      useRuntimeConfig().minecraft.host as string,
      Number(useRuntimeConfig().query.port),
      {
        enableSRV: false,
        timeout: 200,
      },
    );
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch server status',
      data: error,
    });
  }
});
