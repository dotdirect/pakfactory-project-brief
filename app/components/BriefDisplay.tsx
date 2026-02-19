'use client'

import { useProject } from '../contexts/ProjectContext'
import { useEffect, useState, useRef } from 'react'
import ProductIcon from './ProductIcon'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

declare global {
  interface Window {
    botpress: {
      on: (eventName: string, callback: (event: any) => void) => void
      off?: (eventName: string, callback?: (event: any) => void) => void
    }
  }
}

export default function BriefDisplay() {
  const { project, setProject, clearProject, isLoading } = useProject()
  const [isRevealed, setIsRevealed] = useState(false)
  const [prevProject, setPrevProject] = useState<typeof project>(null)
  const projectRef = useRef(project)

  // Keep projectRef in sync with project
  useEffect(() => {
    projectRef.current = project
  }, [project])

  // Detect Botpress webchat refresh by watching for script reload
  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    // Check if Botpress webchat script is reloaded
    let scriptCheckInterval: NodeJS.Timeout | null = null

    const checkForWebchatRefresh = () => {
      const webchatScript = document.querySelector('script[src*="botpress.cloud/webchat"]')
      if (!webchatScript) {
        // Script was removed, webchat is refreshing
        clearProject()
        console.log('Botpress webchat script removed - project data cleared')
        if (scriptCheckInterval) {
          clearInterval(scriptCheckInterval)
        }
      }
    }

    // Check periodically for script removal
    scriptCheckInterval = setInterval(checkForWebchatRefresh, 500)

    return () => {
      if (scriptCheckInterval) {
        clearInterval(scriptCheckInterval)
      }
    }
  }, [clearProject])

  // Listen for Botpress custom events
  useEffect(() => {
    // Ensure we're on the client side
    if (typeof window === 'undefined') {
      return
    }

    // Handler for custom events from Botpress
    const handleCustomEvent = (event: any) => {
      console.log('Custom event triggered:', event)

      // Handle both event.payload and direct event structure
      const payload = event.payload || event

      // Check if we have customer or project data
      if (!payload.customer && !payload.project) {
        console.warn('Brief update event missing customer or project data')
        return
      }

      // Get current project data
      const currentProject = projectRef.current

      // Merge customer data
      const customer = {
        firstName: payload.customer?.firstName || currentProject?.customer?.firstName || '',
        lastName: payload.customer?.lastName || currentProject?.customer?.lastName || '',
        email: payload.customer?.email || currentProject?.customer?.email || '',
        phone: payload.customer?.phone || currentProject?.customer?.phone || '',
        company: payload.customer?.company || currentProject?.customer?.company || '',
        annualBudget: payload.customer?.annualBudget ?? currentProject?.customer?.annualBudget ?? 0,
        industry: payload.customer?.industry || currentProject?.customer?.industry || ''
      }

      // Merge project data
      const project = {
        packagingType: payload.project?.packagingType || currentProject?.project?.packagingType || '',
        deliveryCountry: payload.project?.deliveryCountry || currentProject?.project?.deliveryCountry || '',
        details: payload.project?.details || currentProject?.project?.details || '',
        quantity: payload.project?.quantity || currentProject?.project?.quantity || [],
        dimensions: payload.project?.dimensions || currentProject?.project?.dimensions || ''
      }

      // Merge metadata
      const metadata = {
        source: payload.metadata?.source || currentProject?.metadata?.source || 'PakSpecialist_RFQ'
      }

      // Create updated project object
      const updatedProject = {
        customer,
        project,
        metadata,
        timestamp: Date.now()
      }

      console.log('Brief updated:', updatedProject)
      setProject(updatedProject)
    }

    // Wait for botpress to be available
    const setupEventListener = () => {
      if (window.botpress) {
        window.botpress.on('customEvent', handleCustomEvent)
        console.log('Botpress custom event listener registered')
      }
    }

    // Check if botpress is already available
    if (window.botpress) {
      setupEventListener()
    } else {
      // Wait for botpress to load
      const checkInterval = setInterval(() => {
        if (window.botpress) {
          clearInterval(checkInterval)
          setupEventListener()
        }
      }, 100)

      // Cleanup interval after 10 seconds
      const timeout = setTimeout(() => {
        clearInterval(checkInterval)
      }, 10000)

      return () => {
        clearInterval(checkInterval)
        clearTimeout(timeout)
        // Remove event listener on cleanup (if off method exists)
        if (window.botpress && typeof window.botpress.off === 'function') {
          window.botpress.off('customEvent', handleCustomEvent)
        }
      }
    }

    // Cleanup function
    return () => {
      if (window.botpress && typeof window.botpress.off === 'function') {
        window.botpress.off('customEvent', handleCustomEvent)
      }
    }
  }, [setProject])

  // Trigger reveal animation when project data arrives
  useEffect(() => {
    if (project && project !== prevProject) {
      setIsRevealed(true)
      // Trigger reveal animation after a brief delay
      setPrevProject(project)
    
    } else if (!project) {
      setIsRevealed(false)
    }
  }, [project, prevProject])

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col  border-gray-200 bg-gray-50 p-6">
      <Card className="h-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-lg font-semibold tracking-tight">Technical Brief</CardTitle>
          <div className="flex items-center gap-2">
            {project && (
              <>
                <Badge variant="outline" className="border-gray-300 text-gray-700">
                  Structural Audit: Pending
                </Badge>
                <button
                  onClick={clearProject}
                  className="rounded-md px-2 py-1 text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                  title="Clear brief data"
                >
                  Clear
                </button>
              </>
            )}
          </div>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col">
          {!project && !isLoading ? (
            // Empty state
            <div className="flex flex-1 items-center justify-center">
              <p className="text-sm text-gray-500">Technical brief will appear here</p>
            </div>
          ) : project ? (
            // Brief content with reveal animation
            <div
              className={`flex flex-1 flex-col space-y-6 transition-all duration-700 ease-out ${
                isRevealed
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
            >
              {/* Product Icon */}
              {project.project?.packagingType && (
                <div className="flex justify-center pb-6">
                  <ProductIcon productType={project.project.packagingType} />
                </div>
              )}

              {/* Customer Information */}
              {project.customer && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <div className="text-xs font-medium uppercase tracking-wider text-gray-500">
                      Lead Architect
                    </div>
                    <div className="text-base font-normal text-black">
                      {project.customer.firstName} {project.customer.lastName}
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-xs font-medium uppercase tracking-wider text-gray-500">
                      Contact
                    </div>
                    <div className="text-base font-normal text-black">
                      {project.customer.email}
                    </div>
                    {project.customer.phone && (
                      <div className="text-sm font-normal text-gray-600">
                        {project.customer.phone}
                      </div>
                    )}
                  </div>
                   
                  {project.customer.company && (
                    <div className="space-y-1">
                      <div className="text-xs font-medium uppercase tracking-wider text-gray-500">
                        Company
                      </div>
                      <div className="text-base font-normal text-black">
                        {project.customer.company}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <Separator className="bg-gray-200" />

              {/* Project Information */}
              {project.project && (
                <div className="space-y-4">
                  {project.project.packagingType && (
                    <div className="space-y-1">
                      <div className="text-xs font-medium uppercase tracking-wider text-gray-500">
                        Packaging Type
                      </div>
                      <div className="text-base font-normal text-black">
                        {project.project.packagingType}
                      </div>
                    </div>
                  )}

                  {project.project.deliveryCountry && (
                    <div className="space-y-1">
                      <div className="text-xs font-medium uppercase tracking-wider text-gray-500">
                        Delivery Country
                      </div>
                      <div className="text-base font-normal text-black">
                        {project.project.deliveryCountry}
                      </div>
                    </div>
                  )}

                  {project.project.dimensions && (
                    <div className="space-y-1">
                      <div className="text-xs font-medium uppercase tracking-wider text-gray-500">
                        Dimensions
                      </div>
                      <div className="text-base font-normal text-black">
                        {project.project.dimensions}
                      </div>
                    </div>
                  )}

                  {project.project.quantity && project.project.quantity.length > 0 && (
                    <div className="space-y-1">
                      <div className="text-xs font-medium uppercase tracking-wider text-gray-500">
                        Quantity
                      </div>
                      <div className="text-base font-normal text-black">
                        {project.project.quantity.join(', ')}
                      </div>
                    </div>
                  )}

                  {project.project.details && (
                    <div className="space-y-1">
                      <div className="text-xs font-medium uppercase tracking-wider text-gray-500">
                        Details
                      </div>
                      <div className="text-sm font-normal text-gray-600">
                        {project.project.details}
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              <Separator className="bg-gray-200" />
              
              {/* Additional information */}
              <div className="space-y-2">
                <div className="text-xs font-medium uppercase tracking-wider text-gray-500">
                  Project Status
                </div>
                <div className="text-sm font-normal text-gray-600">
                  Awaiting structural analysis
                </div>
              </div>
            </div>
          ) : (
            // Loading state
            <div className="flex flex-1 items-center justify-center">
              <div className="text-sm text-gray-400">Loading...</div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

