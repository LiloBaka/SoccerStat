export interface Area {
  id: number
  name: string
  code?: string
  flag?: string
}

export interface Competition {
  id: number
  name: string
  code: string
  type: string
  emblem?: string | null
  area: Area
}

export interface CompetitionListResponse {
  count: number
  competitions: Competition[]
}

export interface Team {
  id: number
  name: string
  shortName?: string
  tla?: string
  crest?: string | null
  area?: Area
}

export interface TeamListResponse {
  count: number
  teams: Team[]
}

export interface MatchTeam {
  id: number
  name: string
  shortName?: string
  tla?: string
  crest?: string | null
}

export interface ScoreItem {
  home?: number | null
  away?: number | null
  homeTeam?: number | null
  awayTeam?: number | null
}

export interface MatchScore {
  winner?: string | null
  duration?: string
  fullTime?: ScoreItem | null
  halfTime?: ScoreItem | null
  regularTime?: ScoreItem | null
  extraTime?: ScoreItem | null
  penalties?: ScoreItem | null
}

export interface MatchItem {
  id: number
  utcDate: string
  status: string
  homeTeam: MatchTeam
  awayTeam: MatchTeam
  score: MatchScore
}

export interface ResultSet {
  count: number
  first?: string
  last?: string
  played?: number
}

export interface CompetitionMatchesResponse {
  filters: Record<string, string>
  resultSet: ResultSet
  competition: Competition
  matches: MatchItem[]
}

export interface TeamMatchesResponse {
  filters: Record<string, string | number>
  resultSet: ResultSet
  matches: MatchItem[]
}