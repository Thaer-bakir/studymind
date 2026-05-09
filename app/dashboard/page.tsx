'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/navigation'

interface Task {
  id: string
  title: string
  subject: string
  estimated_minutes: number
  status: string
}

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [newTask, setNewTask] = useState({ title: '', subject: '', estimated_minutes: 60 })
  const router = useRouter()

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      setUser(user)
      await loadTasks()
      setLoading(false)
    }
    init()
  }, [])

  const loadTasks = async () => {
    const { data } = await supabase
      .from('tasks')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: false })
    setTasks(data || [])
  }

  const addTask = async () => {
    if (!newTask.title) return
    await supabase.from('tasks').insert({
      title: newTask.title,
      subject: newTask.subject,
      estimated_minutes: newTask.estimated_minutes,
      user_id: user.id
    })
    setNewTask({ title: '', subject: '', estimated_minutes: 60 })
    setShowModal(false)
    await loadTasks()
  }

  const completeTask = async (id: string) => {
    await supabase.from('tasks').update({ status: 'done' }).eq('id', id)
    await loadTasks()
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) return (
    <main className="min-h-screen bg-[#0F1117] flex items-center justify-center">
      <div className="text-[#4F6EF7] text-xl">جاري التحميل...</div>
    </main>
  )

  const completedToday = tasks.filter(t => t.status === 'done').length
  const totalMinutes = tasks.reduce((acc, t) => acc + t.estimated_minutes, 0)

  return (
    <main className="min-h-screen bg-[#0F1117] text-white">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-5 border-b border-[#1E2340]">
        <h1 className="text-2xl font-bold text-[#4F6EF7]">StudyMind</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-400 text-sm">{user?.email}</span>
          <button onClick={handleLogout} className="text-gray-400 hover:text-white transition text-sm">
            تسجيل خروج
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-8 py-10">
        {/* Start Session Button */}
<div className="bg-gradient-to-r from-[#4F6EF7]/20 to-[#7C3AED]/20 rounded-2xl border border-[#4F6EF7]/30 p-6 mb-6 flex justify-between items-center">
  <div>
    <h3 className="text-xl font-bold mb-1">جاهز تدرس؟ 🎯</h3>
    <p className="text-gray-400 text-sm">ابدأ جلسة Pomodoro الآن</p>
  </div>
  <button
    onClick={() => router.push('/session')}
    className="bg-[#4F6EF7] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#3d5ce0] transition"
  >
    ابدأ الدراسة ←
  </button>
</div>
{/* AI Advisor Button */}
<div className="bg-gradient-to-r from-[#7C3AED]/20 to-[#4F6EF7]/20 rounded-2xl border border-[#7C3AED]/30 p-6 mb-6 flex justify-between items-center">
  <div>
    <h3 className="text-xl font-bold mb-1">مستشارك الذكي 🤖</h3>
    <p className="text-gray-400 text-sm">اسأل AI عن أي شي يخص دراستك</p>
  </div>
  <button
    onClick={() => router.push('/advisor')}
    className="bg-[#7C3AED] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#6d28d9] transition"
  >
    تحدث مع AI ←
  </button>
</div>

        {/* Welcome */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold mb-2">مرحباً! 👋</h2>
          <p className="text-gray-400">شو تبي تدرس اليوم؟</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          <div className="bg-[#1A1F2E] p-6 rounded-2xl border border-[#2A3050]">
            <p className="text-gray-400 text-sm mb-2">المهام اليوم</p>
            <p className="text-3xl font-bold text-[#4F6EF7]">{tasks.length}</p>
          </div>
          <div className="bg-[#1A1F2E] p-6 rounded-2xl border border-[#2A3050]">
            <p className="text-gray-400 text-sm mb-2">وقت الدراسة</p>
            <p className="text-3xl font-bold text-[#4F6EF7]">{Math.round(totalMinutes / 60)}h</p>
          </div>
          <div className="bg-[#1A1F2E] p-6 rounded-2xl border border-[#2A3050]">
            <p className="text-gray-400 text-sm mb-2">مكتمل</p>
            <p className="text-3xl font-bold text-[#059669]">{completedToday}</p>
          </div>
        </div>

        {/* Tasks */}
        <div className="bg-[#1A1F2E] rounded-2xl border border-[#2A3050] p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">مهام اليوم</h3>
            <button
              onClick={() => setShowModal(true)}
              className="bg-[#4F6EF7] text-white px-4 py-2 rounded-xl text-sm hover:bg-[#3d5ce0] transition"
            >
              + أضف مهمة
            </button>
          </div>

          {tasks.length === 0 ? (
            <div className="text-center py-10 text-gray-600">
              <p className="text-4xl mb-3">📚</p>
              <p>ما في مهام بعد — أضف أول مهمة!</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {tasks.map(task => (
                <div key={task.id} className="flex items-center justify-between bg-[#0F1117] p-4 rounded-xl border border-[#2A3050]">
                  <div>
                    <p className="font-medium">{task.title}</p>
                    <p className="text-gray-500 text-sm">{task.subject} · {task.estimated_minutes} دقيقة</p>
                  </div>
                  <button
                    onClick={() => completeTask(task.id)}
                    className="bg-[#059669]/20 text-[#059669] px-3 py-1 rounded-lg text-sm hover:bg-[#059669]/30 transition"
                  >
                    ✓ إنهاء
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#1A1F2E] p-8 rounded-2xl border border-[#2A3050] w-full max-w-md">
            <h3 className="text-xl font-bold mb-6">أضف مهمة جديدة</h3>

            <input
              type="text"
              placeholder="اسم المهمة"
              value={newTask.title}
              onChange={e => setNewTask({ ...newTask, title: e.target.value })}
              className="w-full bg-[#0F1117] border border-[#2A3050] rounded-xl px-4 py-3 mb-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#4F6EF7]"
            />

            <input
              type="text"
              placeholder="المادة (مثال: رياضيات)"
              value={newTask.subject}
              onChange={e => setNewTask({ ...newTask, subject: e.target.value })}
              className="w-full bg-[#0F1117] border border-[#2A3050] rounded-xl px-4 py-3 mb-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#4F6EF7]"
            />

            <input
              type="number"
              placeholder="الوقت المتوقع (بالدقائق)"
              value={newTask.estimated_minutes}
              onChange={e => setNewTask({ ...newTask, estimated_minutes: parseInt(e.target.value) })}
              className="w-full bg-[#0F1117] border border-[#2A3050] rounded-xl px-4 py-3 mb-6 text-white placeholder-gray-600 focus:outline-none focus:border-[#4F6EF7]"
            />

            <div className="flex gap-3">
              <button
                onClick={addTask}
                className="flex-1 bg-[#4F6EF7] text-white py-3 rounded-xl font-bold hover:bg-[#3d5ce0] transition"
              >
                إضافة
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 border border-[#2A3050] text-gray-400 py-3 rounded-xl hover:bg-[#2A3050] transition"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}