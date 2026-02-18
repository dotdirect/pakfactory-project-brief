import Header from './components/Header'
import BriefDisplay from './components/BriefDisplay'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="grid w-full max-w-7xl grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left Column - Chat Interaction */}
          <div className="flex flex-col">
            <div className="flex h-[600px] flex-col rounded-lg border border-gray-200 bg-white p-6">
              <h2 className="mb-4 text-lg font-semibold">Chat</h2>
              <div className="flex flex-1 flex-col">
                {/* Chat messages area */}
                <div className="flex flex-1 flex-col gap-4 overflow-y-auto">
                  {/* Placeholder for chat messages */}
                </div>
                {/* Chat input area */}
                <div className="mt-4 border-t border-gray-200 pt-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                    />
                    <button className="rounded-md bg-black px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-900">
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Technical Brief */}
          <BriefDisplay />
        </div>
      </main>
    </div>
  )
}

