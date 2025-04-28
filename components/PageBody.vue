<template>
  <div class="mx-6 mt-4 mb-6 flex flex-col gap-4 lg:flex-row">
    <div
      class="w-full shrink overflow-hidden rounded-lg bg-zinc-800 py-6 inset-shadow-sm inset-shadow-zinc-900"
    >
      <div class="px-4 pb-5 sm:px-6">Main content</div>
      <div class="px-4 sm:px-6">
        <CommandInput />
      </div>
    </div>

    <div
      class="w-full overflow-hidden rounded-lg bg-zinc-800 py-6 inset-shadow-sm inset-shadow-zinc-900 lg:w-72"
    >
      <div class="px-4 pb-5 sm:px-6">Players</div>
      <ul class="px-4 sm:px-6">
        <PlayerEntry v-for="user in users" :key="user.id" :user="user" />
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { JavaStatusResponse } from 'minecraft-server-util';
import PlayerEntry from '~/components/partials/PlayerEntry.vue';
import type { RconListResponse } from '~/server/api/rcon/list.get';

const { status } = defineProps<{
  status: JavaStatusResponse | null;
}>();

const { data: listResponse } = await useFetch<RconListResponse>(
  '/api/rcon/list',
  {
    key: 'list',
  },
);

const { data: users, refresh: refreshPlayers } = useAsyncData('users', () =>
  $fetch('/api/player/bulk', {
    method: 'GET',
    key: 'users',
    query: {
      names: listResponse.value?.names ?? [],
    },
  }),
);

watch(listResponse, refreshPlayers);
</script>
