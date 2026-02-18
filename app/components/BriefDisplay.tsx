'use client'

import { useProject } from '../contexts/ProjectContext'
import { useEffect, useState } from 'react'
import ProductIcon from './ProductIcon'

export default function BriefDisplay() {
  const { project, isLoading } = useProject()
  const [isRevealed, setIsRevealed] = useState(false)
  const [prevProject, setPrevProject] = useState<typeof project>(null)

  // Trigger reveal animation when project data arrives
  useEffect(() => {
    if (project && project !== prevProject) {
      setIsRevealed(false)
      // Trigger reveal animation after a brief delay
      const timer = setTimeout(() => {
        setIsRevealed(true)
      }, 100)
      setPrevProject(project)
      return () => clearTimeout(timer)
    } else if (!project) {
      setIsRevealed(false)
    }
  }, [project, prevProject])

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col border-l border-gray-200 bg-white p-8">
      <div className="flex h-full flex-col rounded border border-gray-200 bg-[#f9f9f9] p-8 transition-all duration-500">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight">Technical Brief</h2>
          {project && (
            <span className="rounded-full border border-gray-400 bg-white px-3 py-1 text-xs font-medium tracking-wide text-gray-700">
              Structural Audit: Pending
            </span>
          )}
        </div>
        
        <div className="flex flex-1 flex-col">
          {!project && !isLoading ? (
            // Empty state
            <div className="flex flex-1 items-center justify-center">
              <p className="text-sm text-gray-500">Technical brief will appear here</p>
            </div>
          ) : project ? (
            // Brief content with reveal animation
            <div
              className={`flex flex-1 flex-col space-y-8 transition-all duration-700 ease-out ${
                isRevealed
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
            >
              {/* Product Icon */}
              <div className="flex justify-center border-b border-gray-300 pb-8">
                <ProductIcon productType={project.productType} />
              </div>

              <div className="space-y-6 border-b border-gray-300 pb-8">
                <div className="space-y-1">
                  <div className="text-xs font-medium uppercase tracking-wider text-gray-500">
                    Lead Architect
                  </div>
                  <div className="text-base font-light tracking-wide text-black">
                    {project.fullName}
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="text-xs font-medium uppercase tracking-wider text-gray-500">
                    Contact
                  </div>
                  <div className="text-base font-light tracking-wide text-black">
                    {project.userEmail}
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="text-xs font-medium uppercase tracking-wider text-gray-500">
                    Structural Base
                  </div>
                  <div className="text-base font-light tracking-wide text-black">
                    {project.productType}
                  </div>
                </div>
              </div>
              
              {/* Additional architectural details area */}
              <div className="flex-1 space-y-4">
                <div className="h-px bg-gray-300"></div>
                <div className="space-y-2">
                  <div className="text-xs font-medium uppercase tracking-wider text-gray-500">
                    Project Status
                  </div>
                  <div className="text-sm font-light text-gray-600">
                    Awaiting structural analysis
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Loading state
            <div className="flex flex-1 items-center justify-center">
              <div className="text-sm text-gray-400">Loading...</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

