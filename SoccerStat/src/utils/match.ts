import type { MatchScore, ScoreItem } from '@/types/api'

const MATCH_STATUS_TRANSLATIONS: Record<string, string> = {
  SCHEDULED: 'Запланирован',
  TIMED: 'Запланирован',
  LIVE: 'В прямом эфире',
  IN_PLAY: 'В игре',
  PAUSED: 'Пауза',
  EXTRA_TIME: 'Доп. время',
  PENALTY_SHOOTOUT: 'Серия пенальти',
  FINISHED: 'Завершен',
  POSTPONED: 'Отложен',
  SUSPENDED: 'Приостановлен',
  CANCELED: 'Отменен',
  CANCELLED: 'Отменен',
  AWARDED: 'Техническое поражение',
}

function getHomeScore(scoreItem?: ScoreItem | null) {
  return scoreItem?.home ?? scoreItem?.homeTeam ?? null
}

function getAwayScore(scoreItem?: ScoreItem | null) {
  return scoreItem?.away ?? scoreItem?.awayTeam ?? null
}

function hasScore(scoreItem?: ScoreItem | null) {
  return getHomeScore(scoreItem) !== null && getAwayScore(scoreItem) !== null
}

function formatScorePair(scoreItem: ScoreItem) {
  return `${getHomeScore(scoreItem)}:${getAwayScore(scoreItem)}`
}

export function translateMatchStatus(status: string) {
  return MATCH_STATUS_TRANSLATIONS[status] || status
}

export function formatMatchScore(score: MatchScore) {
  const parts: string[] = []

  if (hasScore(score.fullTime)) {
    parts.push(formatScorePair(score.fullTime!))
  } else if (hasScore(score.regularTime)) {
    parts.push(formatScorePair(score.regularTime!))
  }

  if (hasScore(score.extraTime)) {
    parts.push(`(д.в. ${formatScorePair(score.extraTime!)})`)
  }

  if (hasScore(score.penalties)) {
    parts.push(`(пен. ${formatScorePair(score.penalties!)})`)
  }

  return parts.join(' ') || '—'
}