import serverUtils from 'minecraft-server-util';

export default defineEventHandler(async () => {
  const status = await serverUtils.status(
    process.env.MINECRAFT_HOST as string,
    Number(process.env.QUERY_PORT),
    {
      enableSRV: false,
      timeout: 200,
    },
  );

  return status;
});
