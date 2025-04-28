<template>
  <div class="container sm:px-6 sm:pt-2 lg:mx-auto lg:px-8 lg:pt-4 mx-auto">
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

        <Toggle v-model="enableAutoRefresh" class="cursor-pointer" title="Toggle auto-update">
          <Icon
            name="ic:outline-sync"
            class="size-10"
            aria-hidden="true"
          ></Icon>
        </Toggle>
      </template>
    </PageHeading>

    <PageBody :status></PageBody>
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
  // If server is currently online, send a stop command
  if (status.value?.version) {
    await $fetch('/api/rcon/command', {
      method: 'POST',
      body: {
        command: 'stop',
      },
    });

    refreshData();
    return;
  }

  await $fetch('/api/server/start', {
    method: 'POST',
  });
}
</script>
