<template>
  <ScrollArea
    ref="outputArea"
    class="mb-2 h-[50vh] min-h-96 rounded-lg bg-background px-4 pr-4 focus:outline-none"
  >
    <code
      ref="outputContent"
      class="flex flex-col gap-y-1 py-2 text-wrap wrap-anywhere"
    >
      <MinecraftLogLine
        v-for="(message, index) in output"
        :key="index"
        :message="message"
      />
      <span ref="endOfOutput" class="invisible"></span>
    </code>
  </ScrollArea>

  <form class="flex w-full items-center gap-1.5" @submit.prevent="submitInput">
    <Input
      id="command"
      v-model="commandInput"
      type="text"
      placeholder="Type 'help' to see available commands"
      class="!bg-background"
    />
    <Button class="cursor-pointer" size="sm" type="submit">Send</Button>
  </form>
</template>

<script setup lang="ts">
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { ScrollArea } from '~/components/ui/scroll-area';
import type MinecraftLogMessage from '~/types/MinecraftLogMessage';

const { follow } = defineProps<{
  follow: boolean;
}>();

const commandInput = ref<string>('');
const output = ref<MinecraftLogMessage[]>([]);

const {
  data: wsData,
  send: wsSend,
  open: wsOpen,
  close: wsClose,
} = useWebSocket('/api/docker/attach', {
  immediate: false,
  autoReconnect: {
    delay: 10000,
  },
});

watch(wsData, async (data) => {
  const messages = JSON.parse(data);
  output.value.push(...messages);
  await nextTick();
  scrollToBottom(messages.length < 10);
});

async function submitInput() {
  if (commandInput.value.trim() === '') {
    return;
  }

  const command = commandInput.value.trim();

  commandInput.value = '';

  wsSend(command);
}

const outputArea = templateRef<HTMLDivElement>('outputArea');
const outputContent = templateRef<HTMLParagraphElement>('outputContent');

function scrollToBottom(smooth: boolean = true) {
  if (outputContent.value && follow) {
    outputContent.value.scrollIntoView({
      block: 'end',
      inline: 'nearest',
      behavior: smooth ? 'smooth' : 'instant',
    });
  }
}

watch(
  () => follow,
  (value) => {
    if (value) {
      scrollToBottom(true);
    }
  },
);

onMounted(wsOpen);

onUnmounted(wsClose);
</script>
