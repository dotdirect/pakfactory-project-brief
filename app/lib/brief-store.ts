// Simple in-memory store for brief data
// In production, this would be replaced with a database

interface BriefData {
  fullName: string
  userEmail: string
  productType: string
  timestamp: number
}

let briefData: BriefData | null = null

export function storeBrief(data: Omit<BriefData, 'timestamp'>) {
  briefData = {
    ...data,
    timestamp: Date.now(),
  }
}

export function getBrief(): BriefData | null {
  return briefData
}

