<template>
  <ScrollArea
    ref="outputArea"
    class="mb-2 h-[50vh] min-h-96 w-full rounded-lg bg-background focus:outline-none"
  >
    <p class="mx-4 w-full py-2" ref="outputContent">
      <span v-for="(line, index) in output" :key="index">
        {{ line }}
        <br />
      </span>
    </p>
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

  const response = (await sendCommand(command)).response;
  output.value.push(...response);
  await nextTick();
  scrollToBottom();
}

const outputArea = templateRef<HTMLDivElement>('outputArea');
const outputContent = templateRef<HTMLParagraphElement>('outputContent');

async function scrollToBottom() {
  const scroll = outputContent.value.parentElement;
  if (scroll && outputArea.value) {
    console.log(scroll.scrollTop, outputContent.value.scrollHeight);
    scroll.scrollTo({
      top: outputContent.value.scrollHeight,
    });
  }
}
</script>
