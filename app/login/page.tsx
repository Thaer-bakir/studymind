'use client'
import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async () => {
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError('البريد أو كلمة المرور غلط')
    } else {
      router.push('/dashboard')
    }
    setLoading(false)
  }

  const handleRegister = async () => {
  setLoading(true)
  setError('')
  const { data, error } = await supabase.auth.signUp({ 
    email, 
    password,
    options: {
      emailRedirectTo: undefined
    }
  })
  if (error) {
    setError(error.message)
  } else if (data.user) {
    setError('تم إنشاء الحساب بنجاح!')
  } else {
    setError('حصل خطأ غير متوقع')
  }
  setLoading(false)
}

  return (
    <main className="min-h-screen bg-[#0F1117] text-white flex items-center justify-center">
      <div className="bg-[#1A1F2E] p-10 rounded-2xl border border-[#2A3050] w-full max-w-md">
        <h1 className="text-3xl font-bold text-[#4F6EF7] mb-2 text-center">StudyMind</h1>
        <p className="text-gray-400 text-center mb-8">سجل دخول أو أنشئ حساب جديد</p>

        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-[#0F1117] border border-[#2A3050] rounded-xl px-4 py-3 mb-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#4F6EF7]"
        />

        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-[#0F1117] border border-[#2A3050] rounded-xl px-4 py-3 mb-6 text-white placeholder-gray-600 focus:outline-none focus:border-[#4F6EF7]"
        />

        {error && <p className="text-center mb-4 text-sm text-red-400">{error}</p>}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-[#4F6EF7] text-white py-3 rounded-xl font-bold mb-3 hover:bg-[#3d5ce0] transition disabled:opacity-50"
        >
          {loading ? 'جاري التحميل...' : 'تسجيل الدخول'}
        </button>

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full border border-[#4F6EF7] text-[#4F6EF7] py-3 rounded-xl font-bold hover:bg-[#4F6EF7]/10 transition disabled:opacity-50"
        >
          إنشاء حساب جديد
        </button>
      </div>
    </main>
  )
}