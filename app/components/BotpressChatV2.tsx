'use client'

import { useEffect, useState, useRef } from 'react'
import Script from 'next/script'

declare global {
  interface Window {
    botpressWebChat: {
      init: (config: {
        composerPlaceholder?: string
        botConversationDescription?: string
        botId: string
        clientId: string
        hostUrl?: string
        webhookId?: string
        lazySocket?: boolean
        enableTranscriptDownload?: boolean
      }) => void
      onEvent: (callback: (event: any) => void, filter?: { type?: string }) => void
    }
  }
}

export default function BotpressChatV2() {
  const [brief, setBrief] = useState({
    name: ''
  })
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const botpressInitializedRef = useRef(false)

  useEffect(() => {
    // Ensure we're on the client side
    if (typeof window === 'undefined') {
      return
    }

    // Wait for botpressWebChat to be available
    const initBotpress = () => {
      if (window.botpressWebChat && !botpressInitializedRef.current) {
        try {
          // Initialize Botpress WebChat
          window.botpressWebChat.init({
            composerPlaceholder: 'Type a message...',
            botConversationDescription: 'Chat with our assistant',
            botId: 'YOUR_BOT_ID', // Placeholder
            clientId: 'YOUR_CLIENT_ID', // Placeholder
            hostUrl: 'https://cdn.botpress.cloud',
            lazySocket: true,
            enableTranscriptDownload: false
          })

          botpressInitializedRef.current = true

          // Listen for all events (for debugging)
          window.botpressWebChat.onEvent((event: any) => {
            console.log('Botpress Event Received:', event)

            // Only process custom events with brief_update eventName
            if (
              event.type === 'custom' &&
              event.payload &&
              event.payload.eventName === 'brief_update'
            ) {
              const { field, value } = event.payload

              // Dynamically update the brief state
              setBrief((prevBrief) => {
                const updatedBrief = {
                  ...prevBrief,
                  [field]: value
                }
                console.log('Brief updated:', { field, value, updatedBrief })
                return updatedBrief
              })
            }
          })
        } catch (error) {
          console.error('Error initializing Botpress:', error)
        }
      }
    }

    // Check if botpressWebChat is already available
    if (window.botpressWebChat) {
      initBotpress()
    } else {
      // Wait for the script to load
      const checkInterval = setInterval(() => {
        if (window.botpressWebChat) {
          clearInterval(checkInterval)
          initBotpress()
        }
      }, 100)

      // Cleanup interval after 10 seconds
      const timeout = setTimeout(() => {
        clearInterval(checkInterval)
      }, 10000)

      return () => {
        clearInterval(checkInterval)
        clearTimeout(timeout)
      }
    }
  }, [])

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full">
      {/* Left side: Botpress Chat */}
      <div className="flex h-full w-1/2 flex-col border-r border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold">Chat</h2>
        <div className="flex flex-1 flex-col overflow-hidden rounded border border-gray-200">
          {/* Botpress WebChat will mount here */}
          <div id="bp-webchat" className="flex-1 w-full" />
        </div>
      </div>

      {/* Right side: Brief Preview Panel */}
      <div className="flex h-full w-1/2 flex-col border-l border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold">Brief Preview</h2>
        <div className="flex flex-1 flex-col overflow-hidden rounded border border-gray-200 bg-[#f9f9f9] p-6">
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="text-xs font-medium uppercase tracking-wider text-gray-500">
                Name
              </div>
              <div className="text-base font-light tracking-wide text-black">
                {brief.name ? brief.name : <span className="text-gray-400">Not set</span>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Load Botpress WebChat script - only once */}
      {!scriptLoaded && (
        <Script
          id="botpress-webchat-v2-script"
          src="https://cdn.botpress.cloud/webchat/v3.6/inject.js"
          strategy="afterInteractive"
          onLoad={() => {
            setScriptLoaded(true)
          }}
        />
      )}
    </div>
  )
}

