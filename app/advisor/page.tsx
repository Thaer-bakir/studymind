'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Message {
  role: 'user' | 'ai'
  text: string
}

export default function Advisor() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: 'مرحباً! أنا مستشارك الأكاديمي الذكي 🎓 كيف أقدر أساعدك اليوم؟' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const sendMessage = async () => {
    if (!input.trim() || loading) return

    const userMessage = input
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: userMessage }])
    setLoading(true)

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'ai', text: data.reply || 'حصل خطأ' }])
    } catch {
      setMessages(prev => [...prev, { role: 'ai', text: 'حصل خطأ، حاول مرة ثانية' }])
    }

    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-[#0F1117] text-white flex flex-col">

      {/* Header */}
      <nav className="flex justify-between items-center px-8 py-5 border-b border-[#1E2340]">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🤖</span>
          <div>
            <h1 className="text-lg font-bold">المستشار الذكي</h1>
            <p className="text-gray-500 text-xs">مدعوم بـ Gemini AI</p>
          </div>
        </div>
        <button
          onClick={() => router.push('/dashboard')}
          className="text-gray-400 hover:text-white transition text-sm"
        >
          ← العودة
        </button>
      </nav>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-4 max-w-3xl mx-auto w-full">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xl px-5 py-3 rounded-2xl text-sm leading-relaxed ${
              msg.role === 'user'
                ? 'bg-[#4F6EF7] text-white rounded-br-sm'
                : 'bg-[#1A1F2E] text-gray-200 border border-[#2A3050] rounded-bl-sm'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-[#1A1F2E] border border-[#2A3050] px-5 py-3 rounded-2xl rounded-bl-sm">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-[#4F6EF7] rounded-full animate-bounce" style={{animationDelay:'0ms'}}/>
                <span className="w-2 h-2 bg-[#4F6EF7] rounded-full animate-bounce" style={{animationDelay:'150ms'}}/>
                <span className="w-2 h-2 bg-[#4F6EF7] rounded-full animate-bounce" style={{animationDelay:'300ms'}}/>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="px-8 py-5 border-t border-[#1E2340] max-w-3xl mx-auto w-full">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="اسأل مستشارك... مثلاً: كيف أنظم وقتي قبل الامتحان؟"
            className="flex-1 bg-[#1A1F2E] border border-[#2A3050] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#4F6EF7]"
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="bg-[#4F6EF7] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#3d5ce0] transition disabled:opacity-50"
          >
            إرسال
          </button>
        </div>
      </div>

    </main>
  )
}