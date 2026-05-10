# StudyMind 🧠

> **⚠️ Early Alpha — Under Active Development**
> This project is in its earliest stages. Many features are incomplete, unstable, or subject to major changes. Not recommended for production use.

---

## What is StudyMind?

StudyMind is an AI-powered academic operating system designed specifically for university students — especially those studying abroad or in demanding programs like engineering and medicine.

The goal is not just another to-do app or calendar. StudyMind aims to **understand how a student thinks and studies**, then build a personalized study system that evolves with them over time.

---

## ⚠️ Current Status

| Area | Status |
|------|--------|
| Landing Page | ✅ Done |
| Authentication (Email) | ✅ Done |
| Dashboard | ✅ Basic |
| Task Management | ✅ Basic |
| Pomodoro Timer | ✅ Done |
| AI Advisor (Groq) | ✅ Basic |
| Analytics | 🚧 Not started |
| User Profile | 🚧 Not started |
| Behavioral Analysis | 🚧 Not started |
| ML / Burnout Detection | 🚧 Not started |
| Mobile Responsiveness | 🚧 In progress |

**This is an Early Alpha. Expect bugs, missing features, and breaking changes.**

---

## 🎯 Vision

StudyMind is being built to solve real problems students face:

- Losing focus after short study sessions
- Procrastinating on specific subjects
- Burning out before exams without warning
- Random, unorganized study habits
- Not knowing the right study method for their personality

The long-term vision is a system that:
- Tracks study behavior passively
- Detects burnout risk before it happens
- Adapts the schedule automatically
- Provides personalized AI coaching
- Learns and improves with every session

---

## 🛠️ Tech Stack (Current)

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 + TypeScript |
| Styling | Tailwind CSS |
| Database | Supabase (PostgreSQL) |
| Authentication | Supabase Auth |
| AI Advisor | Groq API (llama-3.3-70b-versatile) |
| Hosting | Vercel |

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- Node.js 18+
- A Supabase account
- A Groq API key (free at console.groq.com)

### Installation

```bash
# Clone the repository
git clone https://github.com/Thaer-bakir/studymind.git
cd studymind

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Fill in your own keys (see below)

# Run the development server
npm run dev
```

### Environment Variables

Create a `.env.local` file with:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GROQ_API_KEY=your_groq_api_key
```

### Database Setup

Run this SQL in your Supabase SQL Editor:

```sql
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title VARCHAR(500) NOT NULL,
  subject VARCHAR(200),
  estimated_minutes INTEGER DEFAULT 60,
  status VARCHAR(20) DEFAULT 'pending',
  due_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_own_tasks" ON tasks USING (auth.uid() = user_id);
CREATE POLICY "users_insert_tasks" ON tasks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "users_update_tasks" ON tasks FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "users_delete_tasks" ON tasks FOR DELETE USING (auth.uid() = user_id);
```

---

## 📁 Project Structure

```
app/
├── advisor/        # AI Advisor chat page
├── api/
│   └── ai/        # Groq AI proxy endpoint
├── dashboard/      # Main dashboard
├── lib/
│   └── supabase.ts # Supabase client
├── login/          # Auth page
├── session/        # Pomodoro timer
└── page.tsx        # Landing page
```

---

## 🗺️ Roadmap

### Now (Alpha)
- [x] Authentication
- [x] Task management
- [x] Pomodoro timer
- [x] AI chat advisor

### Next (Beta)
- [ ] User profile & onboarding
- [ ] Analytics dashboard
- [ ] Study session tracking
- [ ] Mobile responsive design
- [ ] Exam countdown

### Future (V2)
- [ ] Behavioral analysis engine
- [ ] Burnout prediction (ML)
- [ ] Adaptive scheduling
- [ ] Spaced repetition
- [ ] Multi-language support

---

## 🤝 Contributing

The project is in early alpha and not ready for external contributions yet. Feel free to watch the repo and come back later.

If you have ideas or feedback, open an issue.

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

## 👨‍💻 Author

Built by **Thaer Bakir** — a university student building tools for students.

> *"I built this because I needed it myself."*

---

**Live Demo:** [studymind-six.vercel.app](https://studymind-six.vercel.app)
