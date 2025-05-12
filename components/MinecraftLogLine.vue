<template>
  <span v-if="isObject(message)" class="w-full">
    <span class="text-gray-300">[{{ message.timestamp }}]</span>
    {{ message }}
  </span>
  <span v-else>{{ message }}</span>
</template>

<script setup lang="ts">
import type MinecraftLogMessage from '~/types/MinecraftLogMessage';
import { isObject } from 'lodash';

export type MinecraftLogLineProps = {
  message: MinecraftLogMessage | string;
};
defineProps<MinecraftLogLineProps>();
</script>
