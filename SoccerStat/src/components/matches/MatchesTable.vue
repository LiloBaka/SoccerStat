<script setup lang="ts">
import type { MatchItem } from '@/types/api'
import { formatMatchDate, formatMatchTime } from '@/utils/date'
import { formatMatchScore, translateMatchStatus } from '@/utils/match'

defineProps<{
  matches: MatchItem[]
}>()
</script>

<template>
  <div class="table-wrapper">
    <table class="matches-table">
      <thead>
        <tr>
          <th scope="col">Дата</th>
          <th scope="col">Время</th>
          <th scope="col">Статус</th>
          <th scope="col">Команда A - Команда B</th>
          <th scope="col">Счет</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="match in matches" :key="match.id">
          <td>{{ formatMatchDate(match.utcDate) }}</td>
          <td>{{ formatMatchTime(match.utcDate) }}</td>
          <td>{{ translateMatchStatus(match.status) }}</td>
          <td>{{ match.homeTeam.name }} - {{ match.awayTeam.name }}</td>
          <td>{{ formatMatchScore(match.score) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
