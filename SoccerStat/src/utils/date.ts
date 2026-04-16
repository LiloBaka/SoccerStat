import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.locale('ru')

export function formatMatchDate(utcDate: string) {
  return dayjs.utc(utcDate).local().format('DD.MM.YYYY')
}

export function formatMatchTime(utcDate: string) {
  return dayjs.utc(utcDate).local().format('HH:mm')
}

export function normalizeApiDate(date: string) {
  return dayjs(date).format('YYYY-MM-DD')
}

export function isDateRangeInvalid(dateFrom: string, dateTo: string) {
  return dayjs(dateFrom).isAfter(dayjs(dateTo), 'day')
}
