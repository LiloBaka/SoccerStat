<script setup lang="ts">
import { computed } from 'vue'

import type { Team } from '@/types/api'

const props = defineProps<{
  team: Team
}>()

const teamInitials = computed(() =>
  props.team.name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase(),
)
</script>

<template>
  <RouterLink :to="{ name: 'team-calendar', params: { id: team.id } }" class="info-card">
    <div class="info-card__media">
      <img
        v-if="team.crest"
        :src="team.crest"
        :alt="team.name"
        class="info-card__image"
        loading="lazy"
      />
      <div v-else class="info-card__fallback">{{ teamInitials }}</div>
    </div>

    <h2 class="info-card__title">{{ team.name }}</h2>
  </RouterLink>
</template>
