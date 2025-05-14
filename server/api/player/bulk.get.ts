import _ from 'lodash';

export default defineEventHandler(async (event) => {
  let names = getQuery(event).names;

  if (_.isEmpty(names)) {
    return [];
  }

  if (!_.isArray(names)) {
    names = [names];
  }

  return await $fetch('https://api.mojang.com/profiles/minecraft', {
    method: 'POST',
    body: names as string[],
  });
});
