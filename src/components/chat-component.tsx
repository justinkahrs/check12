'use client'

import { useEffect, useState, useRef } from 'react'

const sampleMessages = [
  'test test',
  'ios notifications styled chat widget',
  'with profile pictures',
  'hello hello',
  'nice',
  'this is a longer message that will wrap to the next line if it gets too long',
  'checking the microphone',
  '1 2 3 testing',
]

const avatars = ['👩', '👨', '👱‍♀️', '👱', '👩‍🦰', '👨‍🦰', '👩‍🦱', '👨‍🦱', '👩‍🦳', '👨‍🦳', '👩‍🦲', '👨‍🦲']

interface ChatMessage {
  id: number
  text: string
  avatar: string
}

export function ChatComponentComponent() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [counter, setCounter] = useState(0)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const { scrollHeight, clientHeight } = chatContainerRef.current
      chatContainerRef.current.scrollTop = scrollHeight - clientHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const interval = setInterval(() => {
      const newMessage = {
        id: counter,
        text: sampleMessages[counter % sampleMessages.length],
        avatar: avatars[Math.floor(Math.random() * avatars.length)],
      }
      
      setMessages(prev => [...prev, newMessage])
      setCounter(prev => prev + 1)
      
      if (messages.length > 20) {
        setMessages(prev => prev.slice(-20))
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [counter, messages.length])

  return (
    <div className="w-full sm:w-[285px] flex-none h-[500px] bg-gradient-to-b from-purple-400 to-blue-400 rounded-lg overflow-hidden shadow-xl">
      <div 
        ref={chatContainerRef}
        className="w-full h-full overflow-y-auto scrollbar-hide"
      >
        <div className="flex flex-col gap-2 p-4 min-h-full">
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-full">
              <p className="text-white text-opacity-50">Messages will appear here...</p>
            </div>
          )}
          {messages.map((message, index) => (
            <div
              key={message.id}
              className="flex items-start gap-3 p-3 rounded-lg bg-white/10 backdrop-blur-sm transition-all duration-1000 animate-slide-down"
              style={{
                opacity: Math.max(0.2, 1 - (messages.length - index - 1) * 0.1),
              }}
            >
              <div className="h-10 w-10 flex-shrink-0 flex items-center justify-center text-2xl bg-white/20 rounded-full">
                {message.avatar}
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-sm font-semibold text-white">Chatter</div>
                <div className="text-sm text-white/90">{message.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}