'use client'

import { useState } from 'react'

interface Message {
  id: string
  sender: 'anthony' | 'user'
  text: string
  avatar?: string
  inputValue?: string
}

const initialMessages: Message[] = [
  {
    id: '1',
    sender: 'anthony',
    text: "Welcome to the PakFactory. I'm ready to help you architect your next packaging project. Before we dive into the technical details, may I ask who I have the pleasure of speaking with today?",
  },
  {
    id: '2',
    sender: 'user',
    text: '',
    avatar: 'Y',
  },
  {
    id: '3',
    sender: 'anthony',
    text: "It's a pleasure to meet you, Joe. To ensure your progress, structural dielines, and quotes are securely saved to a private portfolio, what is the best work email to use for your project workspace?",
    inputValue: 'joe@google.com',
  },
  {
    id: '4',
    sender: 'anthony',
    text: "Thank you, Joe. I've initialized your secure dashboard. And which brand are we representing today? Knowing your company allows me to pull the correct industry material standards from our library.",
  },
]

export default function Chat() {
  const [messages] = useState<Message[]>(initialMessages)

  return (
    <div className="flex h-[600px] flex-col rounded-lg border border-gray-200 bg-white p-6">
      <h2 className="mb-4 text-lg font-semibold">Chat</h2>
      <div className="flex flex-1 flex-col">
        {/* Chat messages area */}
        <div className="flex flex-1 flex-col gap-6 overflow-y-auto pr-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.sender === 'user' ? 'items-start' : 'items-start'
              }`}
            >
              {/* Avatar */}
              <div className="flex-shrink-0">
                {message.sender === 'anthony' ? (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-xs font-medium text-white">
                    A
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-xs font-medium text-white">
                      {message.avatar || 'Y'}
                    </div>
                    <div className="text-[10px] text-gray-600">
                      <div>You</div>
                      <div className="font-medium">Joe P</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Message content */}
              <div className="flex flex-1 flex-col gap-1">
                {message.sender === 'anthony' && (
                  <div className="text-sm font-medium text-black">Anthony</div>
                )}
                {message.text && (
                  <div className="text-sm leading-relaxed text-gray-900">
                    {message.text}
                  </div>
                )}
                {message.inputValue && (
                  <input
                    type="text"
                    value={message.inputValue}
                    readOnly
                    className="mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                  />
                )}
                {/* Icons below message */}
                {message.sender === 'anthony' && (
                  <div className="mt-1 flex items-center gap-3">
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                        />
                      </svg>
                    </button>
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                    </button>
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17.293 13m0 0l-5-5m5 5v5m0-5h-5"
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Chat input area */}
        <div className="mt-4 border-t border-gray-200 pt-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Message Anthony"
              className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 placeholder-gray-500 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
            />
            <button className="flex items-center justify-center rounded-md bg-black px-4 py-2 text-white transition-colors hover:bg-gray-900">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </button>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            PakSpecialist can make mistakes. Consider checking important
            information.
          </p>
        </div>
      </div>
    </div>
  )
}

