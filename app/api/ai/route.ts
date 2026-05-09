import Groq from 'groq-sdk'
import { NextRequest, NextResponse } from 'next/server'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json()

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: 'أنت مستشار أكاديمي ذكي اسمك StudyMind. مهمتك مساعدة الطلاب الجامعيين في دراستهم وتنظيم وقتهم وتحسين تركيزهم. كن مختصراً وودوداً وعملياً. أجب دائماً باللغة العربية.'
        },
        {
          role: 'user',
          content: message
        }
      ]
    })

    const reply = completion.choices[0].message.content

    return NextResponse.json({ reply })
  } catch (error: any) {
    console.error('AI Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}