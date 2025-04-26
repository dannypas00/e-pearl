<template>
  <div class="mt-4 grid grid-cols-6 gap-4">
    <div
      class="overflow-hidden rounded-lg bg-zinc-800 py-6 inset-shadow-sm inset-shadow-zinc-900"
    >
      <div class="px-4 pb-5 sm:px-6">Sidebar</div>
      <div class="px-4 sm:px-6">
        <!-- Content goes here -->
      </div>
    </div>

    <div
      class="col-span-4 overflow-hidden rounded-lg bg-zinc-800 py-6 inset-shadow-sm inset-shadow-zinc-900"
    >
      <div class="px-4 pb-5 sm:px-6">Main content</div>
      <div class="px-4 sm:px-6">
        <!-- Content goes here -->
      </div>
    </div>

    <div
      class="overflow-hidden rounded-lg bg-zinc-800 py-6 inset-shadow-sm inset-shadow-zinc-900"
    >
      <div class="px-4 pb-5 sm:px-6">Players</div>
      <div class="px-4 sm:px-6">
        <PlayerEntry
          v-for="name in listResponse?.names"
          :key="name"
          :name="name"
        />
      </div>
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

const { data: listResponse } = useFetch<RconListResponse>('/api/rcon/list');
</script>
