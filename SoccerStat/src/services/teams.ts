import { http } from '@/services/http'
import type { Team, TeamListResponse, TeamMatchesResponse } from '@/types/api'

export async function getTeams() {
  const response = await http.get<TeamListResponse>('/teams')

  return [...response.data.teams].sort((first, second) => first.name.localeCompare(second.name))
}

export async function getTeamById(teamId: string) {
  const response = await http.get<Team>(`/teams/${teamId}`)

  return response.data
}

export async function getTeamMatches(teamId: string, dateFrom?: string, dateTo?: string) {
  const params = {
    limit: 500,
    ...(dateFrom && dateTo ? { dateFrom, dateTo } : {}),
  }

  const response = await http.get<TeamMatchesResponse>(`/teams/${teamId}/matches`, { params })

  return response.data
}
