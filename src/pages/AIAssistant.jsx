import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Send, Sparkles } from 'lucide-react'

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    { role: 'ai', content: "Hi! I'm your AI assistant. Choose a quick reply below or type your own question." }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const quickReplies = [
    '📝 Generate hashtags & caption for a travel photo',
    '💬 Draft a polite reply to a customer complaint',
    '💡 Give me 3 Reel ideas for a fitness blog',
  ]

  const sendMessage = async (text) => {
    if (!text.trim() || isLoading) return

    const newMessages = [...messages, { role: 'user', content: text }]
    setMessages(newMessages)
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: text }),
      })

      if (!response.ok) throw new Error('Network or server error')

      const data = await response.json()
      
      const aiText = data.reply || data.response || 'No response from server'
      
      setMessages([...newMessages, { role: 'ai', content: aiText }])
    } catch (error) {
      console.error('AI Chat Error:', error)
      setMessages([...newMessages, { role: 'ai', content: '**Error:** Failed to get a response from AI.' }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-screen w-full max-w-3xl mx-auto bg-white border-x border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-2 p-4 border-b border-gray-200 bg-white">
        <Sparkles className="text-blue-500" />
        <h2 className="text-lg font-semibold">AI Assistant</h2>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-4">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] p-3 rounded-xl ${
                msg.role === 'user' 
                  ? 'bg-blue-500 text-white rounded-br-none' 
                  : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'
              }`}
            >
              <div className="prose prose-sm max-w-none">
                <ReactMarkdown>
                  {msg.content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 p-3 rounded-xl rounded-bl-none shadow-sm">
              <span className="animate-pulse">Typing...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-200">
        {/* Quick Replies */}
        <div className="flex flex-wrap gap-2 mb-3">
          {quickReplies.map((reply, idx) => (
            <button
              key={idx}
              onClick={() => sendMessage(reply)}
              disabled={isLoading}
              className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 py-1.5 px-3 rounded-full transition-colors disabled:opacity-50"
            >
              {reply}
            </button>
          ))}
        </div>

        {/* Text Input */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
            placeholder="Ask something..."
            disabled={isLoading}
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={isLoading || !input.trim()}
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full disabled:opacity-50 transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}