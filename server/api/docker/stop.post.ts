export default defineEventHandler(async () => {
  try {
    await (await getMinecraftContainer(true)).stop();
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to stop container',
      data: error,
    });
  }
});
