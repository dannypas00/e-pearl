<template>
  <span v-if="isObject(message)" class="w-full">
    <span v-if="message.timestamp" class="text-gray-300" :title="timeAgo">
      [{{ message.timestamp }}]
    </span>
    {{ message }}
  </span>
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

const timeAgo = computed(() => {
  if (isObject(message) && message.timestamp) {
    const split = message.timestamp.split(':');

    return moment()
      .tz('UTC')
      .set({
        hour: parseInt(split[0], 10),
        minute: parseInt(split[1], 10),
        second: parseInt(split[2], 10),
      })
      .fromNow();
  }

  return undefined;
});
</script>
