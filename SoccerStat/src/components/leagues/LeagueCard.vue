<script setup lang="ts">
import { computed } from 'vue'

import type { Competition } from '@/types/api'

const props = defineProps<{
  competition: Competition
}>()

const competitionInitials = computed(() =>
  props.competition.name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase(),
)
</script>

<template>
  <RouterLink
    :to="{ name: 'league-calendar', params: { id: competition.id } }"
    class="info-card"
  >
    <div class="info-card__media">
      <img
        v-if="competition.emblem"
        :src="competition.emblem"
        :alt="competition.name"
        class="info-card__image"
        loading="lazy"
      />
      <div v-else class="info-card__fallback">{{ competitionInitials }}</div>
    </div>

    <h2 class="info-card__title">{{ competition.name }}</h2>
    <p class="info-card__subtitle">{{ competition.area.name }}</p>
  </RouterLink>
</template>
