<template>
  <div class="lg:flex lg:items-center lg:justify-between">
    <div class="min-w-0 flex-1">
      <h2
        class="text-2xl/7 font-bold text-foreground sm:truncate sm:text-3xl sm:tracking-tight"
      >
        <img
          class="mr-2 inline aspect-square size-10 rounded-xs"
          :src="status.favicon ?? defaultImage"
        >
        {{ runtimeConfig.public.minecraft.name }}
      </h2>
      <div
        class="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6"
      >
        <div class="mt-2 flex items-center text-sm text-gray-500">
          <Icon
            name="carbon:dot-mark"
            class="mr-1.5 size-5 shrink-0 text-gray-400"
            :class="isActive ? 'text-green-500' : 'text-red-500'"
            aria-hidden="true"
          ></Icon>
          Status: {{ isActive ? 'Online' : 'Offline' }}
        </div>
        <template v-if="isActive">
          <div class="mt-2 flex items-center text-sm text-gray-500">
            <Icon
              name="carbon:location"
              class="mr-1.5 size-5 shrink-0 text-gray-400"
              aria-hidden="true"
            ></Icon>
            <span class="sr-only">Server address: </span>
            {{ address }}
          </div>
          <div
            class="mt-2 flex items-center text-sm text-gray-500"
            :title="playerSample"
          >
            <Icon
              name="carbon:user-multiple"
              class="mr-1.5 size-5 shrink-0 text-gray-400"
              aria-hidden="true"
            ></Icon>
            {{ status?.players.online }} / {{ status?.players.max }}
            players online
          </div>
        </template>
      </div>
    </div>

    <div class="mt-5 flex lg:mt-0 lg:ml-4">
      <slot name="buttons"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { JavaStatusResponse } from 'minecraft-server-util';
import defaultImage from '~/assets/img/pack.webp';

const runtimeConfig = useRuntimeConfig();
const { status } = defineProps<{
  status: JavaStatusResponse;
}>();

const isActive = computed(() => {
  return Boolean(status?.version);
});

const address =
  runtimeConfig.public.minecraft.host +
  ':' +
  runtimeConfig.public.minecraft.port;

const playerSample = computed(() => {
  if (status?.players.sample) {
    return status.players.sample.map((player) => player.name).join(', ');
  }
  return undefined;
});
</script>
