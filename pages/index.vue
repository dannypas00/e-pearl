<template>
  <div
    class="container mx-auto sm:px-6 sm:pt-2 sm:pb-4 lg:px-8 lg:pt-4 lg:pb-8"
  >
    <PageHeading :status></PageHeading>
  </div>
</template>

<script setup lang="ts">
useHead({
  htmlAttrs: {
    class: 'dark',
  },
});

const { data: status } = await useFetch('/api/rcon/query');
</script>
