<template>
  <ScrollArea
    ref="outputArea"
    class="mb-2 h-[50vh] min-h-96 w-full rounded-lg bg-background pr-4 focus:outline-none"
  >
    <code
      class="mx-4 flex w-full flex-col gap-y-1 py-2 text-wrap wrap-anywhere"
      ref="outputContent"
    >
      <span
        v-for="(line, index) in output"
        :key="index"
        v-text="line"
        class="w-[98%]"
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

const { sendCommand } = useServerStore();

const commandInput = ref<string>('');

const output = ref<string[]>([]);

async function submitInput() {
  if (commandInput.value.trim() === '') {
    return;
  }

  const command = commandInput.value.trim();

  commandInput.value = '';

  output.value.push(`> ${command}`);

  const response = (await sendCommand(command)).response;
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
</script>
