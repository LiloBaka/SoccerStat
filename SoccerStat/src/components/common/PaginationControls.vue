<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: number
  totalPages: number
}>()

const emit = defineEmits<{
  'update:modelValue': [page: number]
}>()

const pages = computed(() => {
  const items: number[] = []
  const startPage = Math.max(1, props.modelValue - 2)
  const endPage = Math.min(props.totalPages, startPage + 4)

  for (let page = startPage; page <= endPage; page += 1) {
    items.push(page)
  }

  return items
})

function setPage(page: number) {
  if (page < 1 || page > props.totalPages || page === props.modelValue) {
    return
  }

  emit('update:modelValue', page)
}
</script>

<template>
  <nav v-if="totalPages > 1" class="pagination" aria-label="Пагинация">
    <button class="pagination__button" type="button" @click="setPage(modelValue - 1)">←</button>

    <button
      v-for="page in pages"
      :key="page"
      :aria-current="page === modelValue ? 'page' : undefined"
      :class="['pagination__button', { 'pagination__button--active': page === modelValue }]"
      type="button"
      @click="setPage(page)"
    >
      {{ page }}
    </button>

    <button class="pagination__button" type="button" @click="setPage(modelValue + 1)">→</button>
  </nav>
</template>
