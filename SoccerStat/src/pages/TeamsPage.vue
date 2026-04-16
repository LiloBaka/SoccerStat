<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'

import PaginationControls from '@/components/common/PaginationControls.vue'
import SearchInput from '@/components/common/SearchInput.vue'
import StateBlock from '@/components/common/StateBlock.vue'
import TeamCard from '@/components/teams/TeamCard.vue'
import { getTeams } from '@/services/teams'
import type { Team } from '@/types/api'
import { getApiErrorMessage, getMissingTokenMessage, hasApiToken } from '@/utils/api'
import { paginateItems } from '@/utils/pagination'

const teams = ref<Team[]>([])
const searchQuery = ref('')
const currentPage = ref(1)
const isLoading = ref(false)
const errorMessage = ref('')

const pageSize = 20

const filteredTeams = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  if (!query) {
    return teams.value
  }

  return teams.value.filter((team) => team.name.toLowerCase().includes(query))
})

const pagination = computed(() => paginateItems(filteredTeams.value, currentPage.value, pageSize))

watch(searchQuery, () => {
  currentPage.value = 1
})

watch(
  () => pagination.value.page,
  (page) => {
    currentPage.value = page
  },
)

async function loadTeams() {
  if (!hasApiToken()) {
    errorMessage.value = getMissingTokenMessage()
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    teams.value = await getTeams()
  } catch (error) {
    errorMessage.value = getApiErrorMessage(error)
  } finally {
    isLoading.value = false
  }
}

onMounted(loadTeams)
</script>

<template>
  <section class="page-section">

    <SearchInput v-model="searchQuery" placeholder="Поиск по названию команды" />

    <StateBlock v-if="isLoading" type="loading" title="Загружаем команды" description="Получаем команды из API." />

    <StateBlock
      v-else-if="errorMessage"
      type="error"
      title="Не удалось загрузить команды"
      :description="errorMessage"
      action-label="Повторить"
      @action="loadTeams"
    />

    <StateBlock
      v-else-if="!filteredTeams.length"
      type="empty"
      title="Ничего не найдено"
      description="Попробуй другой запрос."
    />

    <template v-else>
      <div class="cards-grid">
        <TeamCard v-for="team in pagination.items" :key="team.id" :team="team" />
      </div>

      <PaginationControls v-model="currentPage" :total-pages="pagination.totalPages" />
    </template>
  </section>
</template>
