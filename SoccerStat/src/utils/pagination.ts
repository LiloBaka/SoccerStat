export interface PaginationResult<T> {
  page: number
  totalPages: number
  totalItems: number
  items: T[]
}

export function paginateItems<T>(items: T[], currentPage: number, pageSize: number): PaginationResult<T> {
  const totalItems = items.length
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
  const page = Math.min(Math.max(currentPage, 1), totalPages)
  const startIndex = (page - 1) * pageSize

  return {
    page,
    totalPages,
    totalItems,
    items: items.slice(startIndex, startIndex + pageSize),
  }
}
