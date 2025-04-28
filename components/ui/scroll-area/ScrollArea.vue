<script setup lang="ts">
import { cn } from '@/lib/utils';
import { ScrollAreaCorner, ScrollAreaRoot, type ScrollAreaRootProps, ScrollAreaViewport } from 'reka-ui';
import { computed, type HTMLAttributes } from 'vue';
import ScrollBar from './ScrollBar.vue';

const props = defineProps<ScrollAreaRootProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const rootElement = templateRef('root');
const rootSize = useElementSize(rootElement);

defineExpose({
  scrollBottom: () => {
    rootElement.value?.viewport?.scrollTo({
      top: rootSize.height,
    });
  },
});
</script>

<template>
  <ScrollAreaRoot
    ref="root"
    data-slot="scroll-area"
    v-bind="delegatedProps"
    :class="cn('relative', props.class)"
  >
    <ScrollAreaViewport
      data-slot="scroll-area-viewport"
      class="focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1"
    >
      <slot />
    </ScrollAreaViewport>
    <ScrollBar />
    <ScrollAreaCorner />
  </ScrollAreaRoot>
</template>
