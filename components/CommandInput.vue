<template>
  <ScrollArea
    ref="outputArea"
    class="mb-2 h-[50vh] min-h-96 rounded-lg bg-background px-4 pr-4 focus:outline-none"
  >
    <code
      class="flex flex-col gap-y-1 py-2 text-wrap wrap-anywhere"
      ref="outputContent"
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
import MinecraftLogLine from '~/components/MinecraftLogLine.vue';

const { sendCommand } = useServerStore();

const commandInput = ref<string>('');

const output = ref<Array<string | MinecraftLogMessage[]>>([]);

async function submitInput() {
  if (commandInput.value.trim() === '') {
    return;
  }

  const command = commandInput.value.trim();

  commandInput.value = '';

  output.value.push(`> ${command}`);

  const response = (await sendCommand(command)).response.filter((line) => line);
  output.value.push(...response);
  await nextTick();
  scrollToBottom();
}

const outputArea = templateRef<HTMLDivElement>('outputArea');
const outputContent = templateRef<HTMLParagraphElement>('outputContent');

function scrollToBottom() {
  if (outputContent.value) {
    outputContent.value.scrollIntoView({
      block: 'end',
      inline: 'nearest',
      behavior: 'smooth',
    });
  }
}

onMounted(() => {
  const eventSource = new EventSource('/api/docker/stream');
  eventSource.addEventListener('message', async ({ data }) => {
    console.log(data);
    output.value.push(JSON.parse(data));
    await nextTick();
    scrollToBottom();
  });
});
</script>
