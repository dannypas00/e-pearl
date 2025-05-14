<template>
  <div class="px-4 sm:px-6">
    <div class="relative">
      <ScrollArea
        ref="outputArea"
        class="mb-2 h-[50vh] min-h-96 rounded-lg bg-background px-4 pr-4 focus:outline-none"
      >
        <code
          ref="outputContent"
          class="flex flex-col gap-y-1 py-2 text-wrap wrap-anywhere"
        >
          <template v-for="(message, index) in output" :key="index">
            <MinecraftLogLine
              v-if="logFilter.includes(message?.level ?? 'DEBUG')"
              :message="message"
            />
          </template>
          <span ref="endOfOutput" class="invisible"></span>
        </code>
      </ScrollArea>

      <Button
        v-show="!scrolledToBottom"
        size="icon"
        class="absolute right-3 bottom-3 p-3 transition-opacity duration-200"
        :class="{
          'opacity-10 hover:opacity-80': !scrolledToBottom,
        }"
        @click="scrollToBottom(false)"
      >
        <Icon name="carbon:arrow-down" class="size-5" />
      </Button>
    </div>

    <form
      class="flex w-full items-center gap-1.5"
      @submit.prevent="submitInput"
    >
      <Input
        id="command"
        v-model="commandInput"
        type="text"
        placeholder="Type 'help' to see available commands"
        class="!bg-background"
      />
      <Button class="cursor-pointer" size="sm" type="submit">Send</Button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { ScrollArea } from '~/components/ui/scroll-area';
import type MinecraftLogMessage from '~/types/MinecraftLogMessage';

const { follow } = defineProps<{
  follow: boolean;
  logFilter: string[];
}>();

const commandInput = ref<string>('');
const output = ref<MinecraftLogMessage[]>([]);
const endOfOutput = templateRef<HTMLSpanElement>('endOfOutput');
const scrolledToBottom = useElementVisibility(endOfOutput);

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
