<template>
  <p v-if="isObject(message)" class="w-full">
    <span v-if="message.timestamp" class="text-gray-300">
      {{ message.timestamp }}
    </span>
    <span
      v-if="message.user"
      :class="[levelClass, { 'ml-1': !!message.timestamp }]"
      >[{{ message.level }}]</span
    >
    <span v-if="message.player" class="ml-1 text-emerald-300"
      >&lt;{{ message.player }}&gt;</span
    >:
    {{ message.message }}
  </p>
  <span v-else>{{ message }}</span>
</template>

<script setup lang="ts">
import type MinecraftLogMessage from '~/types/MinecraftLogMessage';
import { isObject } from 'lodash';
import moment from 'moment-timezone';

export type MinecraftLogLineProps = {
  message: MinecraftLogMessage | string;
};
const { message } = defineProps<MinecraftLogLineProps>();

// const timeAgo = computed(() => {
//   if (isObject(message) && message.timestamp) {
//     const split = message.timestamp.split(':');
//
//     return moment()
//       .tz('UTC')
//       .set({
//         hour: parseInt(split[0], 10),
//         minute: parseInt(split[1], 10),
//         second: parseInt(split[2], 10),
//       })
//       .fromNow();
//   }
//
//   return undefined;
// });

const levelClass = computed(() => {
  if (!isObject(message) || !message.level) {
    return undefined;
  }

  switch (message.level) {
    case 'INFO':
      return 'text-green-500/50';
    case 'WARN':
      return 'text-yellow-500/50';
    case 'ERROR':
      return 'text-red-500/50';
    default:
      return 'text-gray-300';
  }
});
</script>
