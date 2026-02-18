'use client'

import Script from 'next/script'

export default function BotpressChat() {
  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col border-r border-gray-200 bg-white p-6">
      <h2 className="mb-4 text-lg font-semibold">Chat</h2>
      <div className="flex flex-1 flex-col overflow-hidden border border-gray-200 rounded">
        {/* Botpress WebChat will mount here - ID must match Botpress settings */}
        <div id="bp-webchat" className="flex-1 w-full" />
      </div>
      
      {/* Load Botpress WebChat v3.6 script */}
      <Script
        id="botpress-webchat-script"
        src="https://cdn.botpress.cloud/webchat/v3.6/inject.js"
        strategy="afterInteractive"
      />
      {/* Load your custom Botpress config file */}
      <Script
        id="botpress-config-script"
        src="https://files.bpcontent.cloud/2026/02/12/15/20260212153152-HN1J1QKQ.js"
        strategy="afterInteractive"
        defer
      />
    </div>
  )
}

