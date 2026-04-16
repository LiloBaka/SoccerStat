<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'

import PaginationControls from '@/components/common/PaginationControls.vue'
import SearchInput from '@/components/common/SearchInput.vue'
import StateBlock from '@/components/common/StateBlock.vue'
import LeagueCard from '@/components/leagues/LeagueCard.vue'
import { getCompetitions } from '@/services/leagues'
import type { Competition } from '@/types/api'
import { getApiErrorMessage, getMissingTokenMessage, hasApiToken } from '@/utils/api'
import { paginateItems } from '@/utils/pagination'

const competitions = ref<Competition[]>([])
const searchQuery = ref('')
const currentPage = ref(1)
const isLoading = ref(false)
const errorMessage = ref('')

const pageSize = 20

const filteredCompetitions = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  if (!query) {
    return competitions.value
  }

  return competitions.value.filter((competition) => competition.name.toLowerCase().includes(query))
})

const pagination = computed(() => paginateItems(filteredCompetitions.value, currentPage.value, pageSize))

watch(searchQuery, () => {
  currentPage.value = 1
})

watch(
  () => pagination.value.page,
  (page) => {
    currentPage.value = page
  },
)

async function loadCompetitions() {
  if (!hasApiToken()) {
    errorMessage.value = getMissingTokenMessage()
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    competitions.value = await getCompetitions()
  } catch (error) {
    errorMessage.value = getApiErrorMessage(error)
  } finally {
    isLoading.value = false
  }
}

onMounted(loadCompetitions)
</script>

<template>
  <section class="page-section">

    <SearchInput v-model="searchQuery" placeholder="Поиск по названию лиги" />

    <StateBlock v-if="isLoading" type="loading" title="Загружаем лиги" description="Получаем список соревнований из API." />

    <StateBlock
      v-else-if="errorMessage"
      type="error"
      title="Не удалось загрузить лиги"
      :description="errorMessage"
      action-label="Повторить"
      @action="loadCompetitions"
    />

    <StateBlock
      v-else-if="!filteredCompetitions.length"
      type="empty"
      title="Ничего не найдено"
      description="Попробуй изменить текст поиска."
    />

    <template v-else>
      <div class="cards-grid">
        <LeagueCard v-for="competition in pagination.items" :key="competition.id" :competition="competition" />
      </div>

      <PaginationControls v-model="currentPage" :total-pages="pagination.totalPages" />
    </template>
  </section>
</template>
