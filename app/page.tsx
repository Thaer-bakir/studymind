export default function Home() {
  return (
    <main className="min-h-screen bg-[#0F1117] text-white">
      
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-6 border-b border-[#1E2340]">
        <h1 className="text-2xl font-bold text-[#4F6EF7]">StudyMind</h1>
        <div className="flex gap-4">
          <button className="text-gray-400 hover:text-white transition">تسجيل الدخول</button>
          <button className="bg-[#4F6EF7] text-white px-5 py-2 rounded-xl hover:bg-[#3d5ce0] transition">
            ابدأ مجاناً
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-4 py-32">
        <div className="bg-[#4F6EF7]/10 text-[#4F6EF7] text-sm px-4 py-2 rounded-full mb-6">
          🎓 مصمم خصيصاً للطلاب الجامعيين
        </div>
        <h2 className="text-5xl font-bold mb-6 leading-tight">
          دراسة أذكى،<br />
          <span className="text-[#4F6EF7]">نتائج أفضل</span>
        </h2>
        <p className="text-gray-400 text-xl max-w-xl mb-10">
          نظام ذكاء اصطناعي يفهم عقلك الدراسي ويبني لك خطة شخصية تتطور معك كل يوم
        </p>
        <button className="bg-[#4F6EF7] text-white px-8 py-4 rounded-2xl text-lg hover:bg-[#3d5ce0] transition">
          ابدأ مجاناً الآن ←
        </button>
      </section>

      {/* Features */}
      <section className="px-8 py-20 max-w-5xl mx-auto">
        <h3 className="text-3xl font-bold text-center mb-16">ليش StudyMind؟</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-[#1A1F2E] p-8 rounded-2xl border border-[#2A3050]">
            <div className="text-4xl mb-4">🧠</div>
            <h4 className="text-xl font-bold mb-3">يفهمك</h4>
            <p className="text-gray-400">يحلل سلوكك الدراسي ويتكيف معك تلقائياً بدون أي إعداد</p>
          </div>

          <div className="bg-[#1A1F2E] p-8 rounded-2xl border border-[#2A3050]">
            <div className="text-4xl mb-4">⚡</div>
            <h4 className="text-xl font-bold mb-3">يخطط لك</h4>
            <p className="text-gray-400">يبني جدول دراسي ذكي يراعي أوقات تركيزك وامتحاناتك</p>
          </div>

          <div className="bg-[#1A1F2E] p-8 rounded-2xl border border-[#2A3050]">
            <div className="text-4xl mb-4">🛡️</div>
            <h4 className="text-xl font-bold mb-3">يحميك</h4>
            <p className="text-gray-400">يكتشف علامات الإرهاق مبكراً ويتدخل قبل الانهيار</p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-600 border-t border-[#1E2340]">
        <p>StudyMind © 2025 — مصنوع بـ ❤️ للطلاب</p>
      </footer>

    </main>
  )
}