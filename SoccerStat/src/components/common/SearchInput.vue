<script setup lang="ts">
defineProps<{
  modelValue: string
  placeholder?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <label class="search-input">
    <span class="visually-hidden">Поиск</span>
    <span class="search-input__icon"></span>
    <input
      :value="modelValue"
      :placeholder="placeholder || 'Поиск'"
      class="search-input__field"
      type="search"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </label>
</template>