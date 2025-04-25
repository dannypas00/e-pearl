<template>
  <div
    class="container mx-auto sm:px-6 sm:pt-2 sm:pb-4 lg:px-8 lg:pt-4 lg:pb-8"
  >
    <PageHeading :status>
      <template #buttons>
        <Toggle v-model="enableAutoRefresh" size="lg" class="cursor-pointer">
          <Icon
            name="ic:outline-sync"
            class="size-10"
            aria-hidden="true"
          ></Icon>
        </Toggle>
      </template>
    </PageHeading>
  </div>
</template>

<script setup lang="ts">
import { Toggle } from '~/components/ui/toggle';

useHead({
  htmlAttrs: {
    class: 'dark',
  },
});

const { data: status } = await useFetch('/api/rcon/query');

const enableAutoRefresh = ref(false);

watch(enableAutoRefresh, (value) => {
  if (value) {
    refreshNuxtData();
    resume();
  } else {
    pause();
  }
});

const { pause, resume } = useTimeoutPoll(() => {
  refreshNuxtData();
}, 5000, {
  immediate: false,
});
</script>
