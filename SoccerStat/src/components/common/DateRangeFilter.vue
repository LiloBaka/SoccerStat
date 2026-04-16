<script setup lang="ts">
defineProps<{
  dateFrom: string
  dateTo: string
  loading?: boolean
  validationMessage?: string
}>()

const emit = defineEmits<{
  'update:dateFrom': [value: string]
  'update:dateTo': [value: string]
  submit: []
  reset: []
}>()
</script>

<template>
  <section class="date-filter card">
    <div class="date-filter__fields">
      <label class="field-group">
        <span class="field-group__label">Матчи с</span>
        <input
          :value="dateFrom"
          class="field-group__control"
          type="date"
          @input="emit('update:dateFrom', ($event.target as HTMLInputElement).value)"
        />
      </label>

      <label class="field-group">
        <span class="field-group__label">по</span>
        <input
          :value="dateTo"
          class="field-group__control"
          type="date"
          @input="emit('update:dateTo', ($event.target as HTMLInputElement).value)"
        />
      </label>
    </div>


    <p v-if="validationMessage" class="field-error">{{ validationMessage }}</p>
  </section>
</template>
