<template>
  {{ name }} <br />
  {{ uuidResponse?.id }}
</template>

<script setup lang="ts">
const { name } = defineProps<{
  name: string;
}>();

const { data: uuidResponse } = useFetch<{ id: string; name: string }>(
  `https://api.mojang.com/users/profiles/minecraft/${name}`,
);
</script>
