import axios from 'axios'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://api.football-data.org/v4'
const apiToken = import.meta.env.VITE_API_TOKEN

export const http = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    ...(apiToken ? { 'X-Auth-Token': apiToken } : {}),
  },
})
