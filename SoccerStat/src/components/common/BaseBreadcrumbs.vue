<script setup lang="ts">
import type { BreadcrumbItem } from '@/types/ui'

defineProps<{
  items: BreadcrumbItem[]
}>()
</script>

<template>
  <nav class="breadcrumbs" aria-label="Хлебные крошки">
    <ol class="breadcrumbs__list">
      <li v-for="(item, index) in items" :key="`${item.label}-${index}`" class="breadcrumbs__item">
        <RouterLink v-if="item.to" :to="item.to" class="breadcrumbs__link">
          {{ item.label }}
        </RouterLink>
        <span v-else class="breadcrumbs__current">{{ item.label }}</span>
      </li>
    </ol>
  </nav>
</template>
