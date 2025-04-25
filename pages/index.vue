<template>
  <div>
    Response:
    <pre>{{ data }}</pre>
  </div>
</template>

<script setup lang="ts">
const { data } = await useFetch('/api/rcon/list');
</script>
