export default defineEventHandler(async () => {
  try {
    await (await getMinecraftContainer(true)).start();
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to start container',
      data: error,
    });
  }
});
