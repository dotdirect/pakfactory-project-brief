// Simple cache for webhook data that works with serverless
// Uses a Map that persists for the duration of the serverless function execution
// For production, replace with Vercel KV, Redis, or a database

interface CachedBrief {
  fullName: string
  userEmail: string
  productType: string
  timestamp: number
}

// In-memory cache (works within a single serverless function invocation)
// For cross-invocation persistence, this would need external storage
const cache = new Map<string, CachedBrief>()

const CACHE_KEY = 'latest-brief'
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

export function cacheWebhookData(data: Omit<CachedBrief, 'timestamp'>) {
  const cached: CachedBrief = {
    ...data,
    timestamp: Date.now(),
  }
  cache.set(CACHE_KEY, cached)
  return cached
}

export function getCachedWebhookData(): CachedBrief | null {
  const cached = cache.get(CACHE_KEY)
  if (!cached) return null
  
  // Check if cache is expired
  if (Date.now() - cached.timestamp > CACHE_TTL) {
    cache.delete(CACHE_KEY)
    return null
  }
  
  return cached
}

