import serverUtils from 'minecraft-server-util';

export default defineEventHandler(async () => {
  const status = await serverUtils.status(
    useRuntimeConfig().minecraft.host as string,
    Number(useRuntimeConfig().query.port),
    {
      enableSRV: false,
      timeout: 200,
    },
  );

  return status;
});
