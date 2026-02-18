'use client'

import { useEffect, useState } from 'react'

interface BriefData {
  fullName: string
  userEmail: string
  productType: string
  timestamp: number
}

export default function BriefDisplay() {
  const [brief, setBrief] = useState<BriefData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Fetch brief data on mount
    fetchBrief()
    
    // Poll for updates every 2 seconds
    const interval = setInterval(fetchBrief, 2000)
    
    return () => clearInterval(interval)
  }, [])

  const fetchBrief = async () => {
    try {
      const response = await fetch('/api/brief')
      const result = await response.json()
      
      if (result.data) {
        setBrief(result.data)
      } else {
        setBrief(null)
      }
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching brief:', error)
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-[600px] flex-col rounded-2xl bg-gray-100 p-8 transition-all duration-500">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-tight">Technical Brief</h2>
        {brief && (
          <span className="rounded-full border border-gray-400 bg-white px-3 py-1 text-xs font-medium tracking-wide text-gray-700">
            Structural Audit: Pending
          </span>
        )}
      </div>
      
      <div className="flex flex-1 flex-col">
        {!brief && !isLoading ? (
          // Empty state
          <div className="flex flex-1 items-center justify-center">
            <p className="text-sm text-gray-500">Technical brief will appear here</p>
          </div>
        ) : brief ? (
          // Brief content with architectural styling
          <div className="flex flex-1 flex-col space-y-8 transition-opacity duration-500">
            <div className="space-y-6 border-b border-gray-300 pb-8">
              <div className="space-y-1">
                <div className="text-xs font-medium uppercase tracking-wider text-gray-500">
                  Lead Architect
                </div>
                <div className="text-base font-light tracking-wide text-black">
                  {brief.fullName}
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="text-xs font-medium uppercase tracking-wider text-gray-500">
                  Email
                </div>
                <div className="text-base font-light tracking-wide text-black">
                  {brief.userEmail}
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="text-xs font-medium uppercase tracking-wider text-gray-500">
                  Structure Base
                </div>
                <div className="text-base font-light tracking-wide text-black">
                  {brief.productType}
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
  )
}

