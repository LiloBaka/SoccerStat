<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import BaseBreadcrumbs from '@/components/common/BaseBreadcrumbs.vue'
import type { BreadcrumbItem } from '@/types/ui'
import DateRangeFilter from '@/components/common/DateRangeFilter.vue'
import PaginationControls from '@/components/common/PaginationControls.vue'
import StateBlock from '@/components/common/StateBlock.vue'
import MatchesTable from '@/components/matches/MatchesTable.vue'
import { getCompetitionMatches } from '@/services/leagues'
import type { MatchItem } from '@/types/api'
import { getApiErrorMessage, getMissingTokenMessage, hasApiToken } from '@/utils/api'
import { isDateRangeInvalid, normalizeApiDate } from '@/utils/date'
import { paginateItems } from '@/utils/pagination'

const route = useRoute()

const competitionName = ref('')
const matches = ref<MatchItem[]>([])
const dateFrom = ref('')
const dateTo = ref('')
const currentPage = ref(1)
const isLoading = ref(false)
const errorMessage = ref('')
const filterMessage = ref('')

const pageSize = 10

const competitionId = computed(() => String(route.params.id))
const breadcrumbs = computed<BreadcrumbItem[]>(() => [
  { label: 'Лиги', to: '/leagues' },
  { label: competitionName.value || 'Календарь лиги' },
])
const pagination = computed(() => paginateItems(matches.value, currentPage.value, pageSize))

watch([dateFrom, dateTo], ([from, to]) => {
  if (!from || !to) return

  applyFilters()
})

async function loadCompetitionMatches(filters?: { dateFrom: string; dateTo: string }) {
  if (!hasApiToken()) {
    errorMessage.value = getMissingTokenMessage()
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    const response = await getCompetitionMatches(
      competitionId.value,
      filters?.dateFrom,
      filters?.dateTo,
    )

    competitionName.value = response.competition.name
    matches.value = response.matches
  } catch (error) {
    errorMessage.value = getApiErrorMessage(error)
  } finally {
    isLoading.value = false
  }
}

async function applyFilters() {
  filterMessage.value = ''

  if (!dateFrom.value && !dateTo.value) {
    currentPage.value = 1
    await loadCompetitionMatches()
    return
  }

  if (!dateFrom.value || !dateTo.value) {
    filterMessage.value = 'Чтобы фильтр сработал через API, заполни обе даты.'
    return
  }

  if (isDateRangeInvalid(dateFrom.value, dateTo.value)) {
    filterMessage.value = 'Дата «с» не может быть позже даты «по».'
    return
  }

  currentPage.value = 1
  await loadCompetitionMatches({
    dateFrom: normalizeApiDate(dateFrom.value),
    dateTo: normalizeApiDate(dateTo.value),
  })
}


onMounted(() => {
  void loadCompetitionMatches()
})
</script>

<template>
  <section class="page-section">
    <BaseBreadcrumbs :items="breadcrumbs" />

    <DateRangeFilter
      v-model:date-from="dateFrom"
      v-model:date-to="dateTo"
      :loading="isLoading"
      :validation-message="filterMessage"
    />

    <StateBlock v-if="isLoading" type="loading" title="Загружаем матчи" description="Получаем календарь лиги." />

    <StateBlock
      v-else-if="errorMessage"
      type="error"
      title="Не удалось загрузить календарь"
      :description="errorMessage"
      action-label="Повторить"
      @action="applyFilters"
    />

    <StateBlock
      v-else-if="!matches.length"
      type="empty"
      title="Матчи не найдены"
      description="Для выбранного периода API не вернуло ни одной игры."
    />

    <template v-else>
      <MatchesTable :matches="pagination.items" />
      <PaginationControls v-model="currentPage" :total-pages="pagination.totalPages" />
    </template>
  </section>
</template>
