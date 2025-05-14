export default defineEventHandler(async (event) => {
  let names = getQuery(event).names;

  if (!names) {
    return [];
  }

  if (typeof names === 'string') {
    names = [names];
  }

  return await $fetch('https://api.mojang.com/profiles/minecraft', {
    method: 'POST',
    body: names as string[],
  });
});
