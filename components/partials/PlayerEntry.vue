<template>
  <DropdownMenu class="mb-2 w-full" as="li">
    <DropdownMenuTrigger class="w-full">
      <span
        class="flex cursor-pointer items-center overflow-hidden rounded-sm bg-zinc-500 px-2 py-1 shadow-sm shadow-zinc-600 transition-colors hover:bg-zinc-600"
      >
        <img
          :src="`https://api.mineatar.io/face/${user.id}?format=jpg&scale=4`"
          alt="Player Face"
          class="not-sr-only mr-1 inline size-5 rounded-xs"
        />
        {{ user.name }}
      </span>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="kick">Kick</DropdownMenuItem>
      <DropdownMenuItem @click="ban">Ban</DropdownMenuItem>
      <DropdownMenuItem @click="ipban">IP-ban</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';

const { user } = defineProps<{
  user: { id: string; name: string };
}>();

const { sendCommand } = useServerStore();

async function kick() {
  await sendCommand(`kick ${user.name}`);
  useTimeoutFn(refreshUserData, 500);
}

async function ban() {
  await sendCommand(`ban ${user.name}`);
  useTimeoutFn(refreshUserData, 500);
}

async function ipban() {
  await sendCommand(`ipban ${user.name}`);
  useTimeoutFn(refreshUserData, 500);
}

async function refreshUserData() {
  await refreshNuxtData(['list']);
}
</script>
