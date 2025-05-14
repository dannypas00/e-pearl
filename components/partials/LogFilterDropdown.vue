<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="default" size="sm">
        Filter logs
        <Icon name="ic:baseline-filter-list" class="text-xl" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56">
      <DropdownMenuLabel>Filter by log level</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuRadioGroup v-model="levelFilter">
        <DropdownMenuRadioItem value="debug">Debug</DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="info">Info</DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="warn">Warn</DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="error">Error</DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script lang="ts" setup>
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ref } from 'vue';

const emit = defineEmits<{
  (e: 'filter', value: string[]): void;
}>();

const filters: Record<string, string[]> = {
  debug: ['DEBUG', 'INFO', 'WARN', 'ERROR'],
  info: ['INFO', 'WARN', 'ERROR'],
  warn: ['WARN', 'ERROR'],
  error: ['ERROR'],
};

const levelFilter: Ref<string> = ref('debug');

watch(levelFilter, (value) => {
  emit('filter', filters[value]);
});

onMounted(() => {
  emit('filter', filters[levelFilter.value]);
});
</script>
