'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface ProjectData {
  fullName: string
  userEmail: string
  productType: string
  timestamp: number
}

interface ProjectContextType {
  project: ProjectData | null
  setProject: (project: ProjectData | null) => void
  isLoading: boolean
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

const STORAGE_KEY = 'pakfactory-project-data'

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [project, setProjectState] = useState<ProjectData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        setProjectState(parsed)
      }
    } catch (error) {
      console.error('Error loading project from localStorage:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Sync to localStorage whenever project changes
  const setProject = (newProject: ProjectData | null) => {
    setProjectState(newProject)
    try {
      if (newProject) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newProject))
      } else {
        localStorage.removeItem(STORAGE_KEY)
      }
    } catch (error) {
      console.error('Error saving project to localStorage:', error)
    }
  }

  // Poll webhook cache and localStorage for updates
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        try {
          if (e.newValue) {
            const parsed = JSON.parse(e.newValue)
            setProjectState(parsed)
          } else {
            setProjectState(null)
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
          if (!project || webhookData.timestamp > project.timestamp) {
            setProjectState(webhookData)
            // Also sync to localStorage
            localStorage.setItem(STORAGE_KEY, JSON.stringify(webhookData))
          }
        }
        
        // Also check localStorage (for persistence)
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
          const parsed = JSON.parse(stored)
          // Only update if timestamp is newer
          if (!project || parsed.timestamp > project.timestamp) {
            setProjectState(parsed)
          }
        } else if (project && !result.data) {
          // Clear if no data from either source
          setProjectState(null)
        }
      } catch (error) {
        console.error('Error checking for project updates:', error)
        // Fallback to localStorage only
        try {
          const stored = localStorage.getItem(STORAGE_KEY)
          if (stored) {
            const parsed = JSON.parse(stored)
            if (!project || parsed.timestamp > project.timestamp) {
              setProjectState(parsed)
            }
          }
        } catch (e) {
          // Ignore localStorage errors
        }
      }
    }

    // Check immediately, then every 2 seconds for instant updates
    checkForUpdates()
    const interval = setInterval(checkForUpdates, 2000)
    
    return () => {
      // window.removeEventListener('storage', handleStorageChange) // DISABLED
      clearInterval(interval)
    }
  }, [project])

  return (
    <ProjectContext.Provider value={{ project, setProject, isLoading }}>
      {children}
    </ProjectContext.Provider>
  )
}

export function useProject() {
  const context = useContext(ProjectContext)
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider')
  }
  return context
}

