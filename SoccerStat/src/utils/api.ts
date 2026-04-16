import axios from 'axios'

export function hasApiToken() {
  return Boolean(import.meta.env.VITE_API_TOKEN)
}

export function getMissingTokenMessage() {
  return 'Не найден VITE_API_TOKEN. Создай .env по примеру из .env.example и вставь свой токен.'
}

export function getApiErrorMessage(error: unknown) {
  if (!axios.isAxiosError(error)) {
    return 'Произошла неизвестная ошибка. Попробуй ещё раз.'
  }

  const status = error.response?.status
  const apiMessage = error.response?.data?.message

  if (status === 401) {
    return 'API токен не прошёл проверку. Проверь значение VITE_API_TOKEN.'
  }

  if (status === 403) {
    return (
      apiMessage ||
      'Доступ к данным запрещён. Проверь токен, тариф или доступность выбранного турнира.'
    )
  }

  if (status === 429) {
    return 'Превышен лимит запросов API. Подожди немного и повтори попытку.'
  }

  if (status && status >= 500) {
    return 'Сервис футбольных данных временно недоступен. Попробуй позже.'
  }

  if (error.code === 'ECONNABORTED') {
    return 'Сервер отвечает слишком долго. Проверь интернет и повтори попытку.'
  }

  return apiMessage || 'Не удалось получить данные от API.'
}
