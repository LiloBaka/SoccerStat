<script setup lang="ts">
withDefaults(
  defineProps<{
    type: 'loading' | 'error' | 'empty'
    title: string
    description?: string
    actionLabel?: string
  }>(),
  {
    description: '',
    actionLabel: '',
  },
)

const emit = defineEmits<{
  action: []
}>()
</script>

<template>
  <section class="state-block" :data-type="type">
    <div v-if="type === 'loading'" class="state-block__spinner" aria-hidden="true"></div>
    <h2 class="state-block__title">{{ title }}</h2>
    <p v-if="description" class="state-block__description">{{ description }}</p>
    <button v-if="actionLabel" class="button button--primary" type="button" @click="emit('action')">
      {{ actionLabel }}
    </button>
  </section>
</template>
