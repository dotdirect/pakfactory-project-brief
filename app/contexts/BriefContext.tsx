'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface BriefData {
  fullName: string
  userEmail: string
  productType: string
  timestamp: number
}

interface BriefContextType {
  brief: BriefData | null
  setBrief: (brief: BriefData | null) => void
  isLoading: boolean
}

const BriefContext = createContext<BriefContextType | undefined>(undefined)

const STORAGE_KEY = 'pakfactory-brief-data'

export function BriefProvider({ children }: { children: React.ReactNode }) {
  const [brief, setBriefState] = useState<BriefData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        setBriefState(parsed)
      }
    } catch (error) {
      console.error('Error loading brief from localStorage:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Sync to localStorage whenever brief changes
  const setBrief = (newBrief: BriefData | null) => {
    setBriefState(newBrief)
    try {
      if (newBrief) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newBrief))
      } else {
        localStorage.removeItem(STORAGE_KEY)
      }
    } catch (error) {
      console.error('Error saving brief to localStorage:', error)
    }
  }

  // Poll webhook cache and localStorage for updates
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        try {
          if (e.newValue) {
            const parsed = JSON.parse(e.newValue)
            setBriefState(parsed)
          } else {
            setBriefState(null)
          }
        } catch (error) {
          console.error('Error parsing storage event:', error)
        }
      }
    }

    // Listen for storage events (cross-tab updates)
    // window.addEventListener('storage', handleStorageChange) // DISABLED
    
    // Poll for updates from webhook cache and localStorage
    const checkForUpdates = async () => {
      try {
        // Check webhook cache (serverless-compatible)
        const response = await fetch('/api/brief')
        const result = await response.json()
        
        if (result.data) {
          const webhookData = result.data
          // Update if webhook data is newer
          if (!brief || webhookData.timestamp > brief.timestamp) {
            setBriefState(webhookData)
            // Also sync to localStorage
            localStorage.setItem(STORAGE_KEY, JSON.stringify(webhookData))
          }
        }
        
        // Also check localStorage (for persistence)
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
          const parsed = JSON.parse(stored)
          // Only update if timestamp is newer
          if (!brief || parsed.timestamp > brief.timestamp) {
            setBriefState(parsed)
          }
        } else if (brief && !result.data) {
          // Clear if no data from either source
          setBriefState(null)
        }
      } catch (error) {
        console.error('Error checking for brief updates:', error)
        // Fallback to localStorage only
        try {
          const stored = localStorage.getItem(STORAGE_KEY)
          if (stored) {
            const parsed = JSON.parse(stored)
            if (!brief || parsed.timestamp > brief.timestamp) {
              setBriefState(parsed)
            }
          }
        } catch (e) {
          // Ignore localStorage errors
        }
      }
    }

    // Check immediately, then every 2 seconds
    checkForUpdates()
    const interval = setInterval(checkForUpdates, 2000)
    
    return () => {
      // window.removeEventListener('storage', handleStorageChange) // DISABLED
      clearInterval(interval)
    }
  }, [brief])

  return (
    <BriefContext.Provider value={{ brief, setBrief, isLoading }}>
      {children}
    </BriefContext.Provider>
  )
}

export function useBrief() {
  const context = useContext(BriefContext)
  if (context === undefined) {
    throw new Error('useBrief must be used within a BriefProvider')
  }
  return context
}

