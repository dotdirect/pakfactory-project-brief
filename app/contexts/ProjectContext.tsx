'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface CustomerData {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  annualBudget: number
  industry?: string
}

export interface ProjectDetails {
  packagingType: string
  deliveryCountry: string
  details?: string
  quantity: number[]
  dimensions: string
}

export interface ProjectData {
  customer: CustomerData
  project: ProjectDetails
  metadata: {
    source: string
  }
  timestamp: number
}

interface ProjectContextType {
  project: ProjectData | null
  setProject: (project: ProjectData | null) => void
  clearProject: () => void
  isLoading: boolean
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

const STORAGE_KEY = 'pakfactory-project-data'

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [project, setProjectState] = useState<ProjectData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Clear localStorage on mount (page refresh) and initialize state
  useEffect(() => {
    try {
      // Clear localStorage on page load/refresh
      localStorage.removeItem(STORAGE_KEY)
      console.log('Project data cleared on page load')
    } catch (error) {
      console.error('Error clearing project from localStorage:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Update project state and persist to localStorage during session
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

  // Clear project data from state and localStorage
  const clearProject = () => {
    setProjectState(null)
    try {
      localStorage.removeItem(STORAGE_KEY)
      console.log('Project data cleared')
    } catch (error) {
      console.error('Error clearing project from localStorage:', error)
    }
  }

  return (
    <ProjectContext.Provider value={{ project, setProject, clearProject, isLoading }}>
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

