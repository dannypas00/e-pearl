<template>
  <div class="container mx-auto mt-6">
    List:
    <pre>{{ data }}</pre>

    Send command:
    <form @submit.prevent="sendCommand">
      <input
        v-model="command"
        type="text"
        class="rounded-md outline-2 outline-gray-500"
      />
    </form>
    Response:
    <pre>{{ commandResponse }}</pre>
  </div>
</template>

<script setup lang="ts">
const { data } = await useFetch('/api/rcon/list');

const command = ref('');
const commandResponse: Ref<{ response?: string[] } | { error: string }> = ref({});

async function sendCommand() {
  if (command.value) {
    const request = $fetch('/api/rcon/command', {
      method: 'POST',
      body: { command: command.value },
    });

    command.value = '';

    commandResponse.value = await request;
  }
}
</script>
