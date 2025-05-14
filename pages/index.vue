<template>
  <div class="container mx-auto sm:px-6 sm:pt-2 lg:mx-auto lg:px-8 lg:pt-4">
    <PageHeading :status>
      <template #buttons>
        <Button
          :variant="status?.version ? 'destructive' : 'secondary'"
          :title="`${status?.version ? 'Stop' : 'Start'} server`"
          class="cursor-pointer"
          size="icon"
          @click="toggleServer"
        >
          <Icon name="carbon:power" class="size-10" aria-hidden="true"></Icon>
        </Button>

        <Toggle
          v-model="enableAutoRefresh"
          class="cursor-pointer"
          title="Toggle auto-update"
        >
          <Icon
            name="ic:outline-sync"
            class="size-10"
            aria-hidden="true"
          ></Icon>
        </Toggle>
      </template>
    </PageHeading>

    <PageBody />
  </div>
</template>

<script setup lang="ts">
import { Toggle } from '~/components/ui/toggle';
import { Button } from '~/components/ui/button';

useHead({
  htmlAttrs: {
    class: 'dark',
  },
});

const { data: status } = await useFetch('/api/rcon/query', {
  key: 'status',
  onRequestError: (error: Error) => {
    console.error('Error fetching status:', error);
  },
});

const enableAutoRefresh = ref(true);

watch(enableAutoRefresh, (value) => {
  if (value) {
    refreshData();
    resume();
  } else {
    pause();
  }
});

const { pause, resume } = useTimeoutPoll(refreshData, 5000, {
  immediate: false,
});

function refreshData() {
  refreshNuxtData(['status', 'list', 'users']);
}

async function toggleServer() {
  if (status.value?.version) {
    await $fetch('/api/docker/stop', {
      method: 'POST',
    });

    refreshData();
    return;
  }

  await $fetch('/api/docker/start', {
    method: 'POST',
  });
}
</script>
