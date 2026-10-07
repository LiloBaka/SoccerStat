const FOOTBALL_API_ORIGIN = 'https://api.football-data.org/v4/'

function isAllowedPath(path) {
  return (
    path === 'competitions' ||
    /^competitions\/[^/]+\/matches$/.test(path) ||
    path === 'teams' ||
    /^teams\/[^/]+(?:\/matches)?$/.test(path)
  )
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiToken = process.env.FOOTBALL_DATA_API_KEY

  if (!apiToken) {
    return res.status(500).json({ error: 'Server API token is not configured' })
  }

  const rawPath = Array.isArray(req.query.path) ? req.query.path.join('/') : req.query.path || ''
  const path = String(rawPath)
    .split('/')
    .filter(Boolean)
    .map((segment) => decodeURIComponent(segment))
    .join('/')

  if (!path || path.includes('..') || !isAllowedPath(path)) {
    return res.status(404).json({ error: 'Unsupported API path' })
  }

  const encodedPath = path
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/')
  const upstreamUrl = new URL(encodedPath, FOOTBALL_API_ORIGIN)

  for (const [key, value] of Object.entries(req.query)) {
    if (key === 'path' || value == null) continue

    if (Array.isArray(value)) {
      for (const item of value) upstreamUrl.searchParams.append(key, String(item))
    } else {
      upstreamUrl.searchParams.append(key, String(value))
    }
  }

  try {
    const upstreamResponse = await fetch(upstreamUrl, {
      headers: {
        Accept: 'application/json',
        'X-Auth-Token': apiToken,
      },
    })

    const body = await upstreamResponse.text()
    const contentType = upstreamResponse.headers.get('content-type')
    const cacheControl = upstreamResponse.headers.get('cache-control')
    const retryAfter = upstreamResponse.headers.get('retry-after')

    if (contentType) res.setHeader('Content-Type', contentType)
    if (cacheControl) res.setHeader('Cache-Control', cacheControl)
    if (retryAfter) res.setHeader('Retry-After', retryAfter)

    return res.status(upstreamResponse.status).send(body)
  } catch (error) {
    console.error('Football API proxy failed:', error)
    return res.status(502).json({ error: 'Football API is unavailable' })
  }
}
