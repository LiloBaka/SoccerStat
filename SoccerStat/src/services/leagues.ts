import { http } from '@/services/http'
import type { CompetitionListResponse, CompetitionMatchesResponse } from '@/types/api'

export async function getCompetitions() {
  const response = await http.get<CompetitionListResponse>('/competitions')

  return [...response.data.competitions].sort((first, second) => first.name.localeCompare(second.name))
}

export async function getCompetitionMatches(
  competitionId: string,
  dateFrom?: string,
  dateTo?: string,
) {
  const params = dateFrom && dateTo ? { dateFrom, dateTo } : undefined

  const response = await http.get<CompetitionMatchesResponse>(`/competitions/${competitionId}/matches`, {
    params,
  })

  return response.data
}
