<template>
  <div class="mx-6 mt-4 mb-6 flex flex-col gap-4 lg:flex-row">
    <div
      class="w-full shrink overflow-hidden rounded-lg bg-zinc-800 py-6 inset-shadow-sm inset-shadow-zinc-900"
    >
      <div
        class="-mt-2 flex w-full items-center justify-between px-4 pb-3 sm:px-6"
      >
        <h2>Main content</h2>
        <div class="flex flex-row items-center space-x-4">
          <div class="flex flex-row items-center space-x-2">
            <Label for="follow-console">Follow console</Label>
            <Switch id="follow-console" v-model="followConsole" />
          </div>
          <LogFilterDropdown @filter="(value) => (logFilter = value)" />
        </div>
      </div>
      <div class="px-4 sm:px-6">
        <CommandInput :log-filter="logFilter" :follow="followConsole" />
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
import PlayerEntry from '~/components/partials/PlayerEntry.vue';
import type { RconListResponse } from '~/server/api/rcon/list.get';
import { Switch } from '~/components/ui/switch';
import { Label } from '~/components/ui/label';
import LogFilterDropdown from '~/components/partials/LogFilterDropdown.vue';

const followConsole = ref(true);
const logFilter: Ref<string[]> = ref([]);

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

watch(
  () => listResponse,
  () => {
    refreshPlayers();
  },
);
</script>
