export default defineEventHandler((event) => {
  const name = getRouterParam(event, 'name');

  return fetch(`https://api.mojang.com/users/profiles/minecraft/${name}`);
});
