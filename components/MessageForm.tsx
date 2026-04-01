'use client'
import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

type MessageFormProps = {
  onMessageAdded: () => void
}

export default function MessageForm({ onMessageAdded }: MessageFormProps) {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content) return
    setLoading(true)
    const { error } = await supabase.from('messages').insert([{ content }])
    setLoading(false)
    if (error) {
      alert('Error saving message: ' + error.message)
    } else {
      setContent('')
      onMessageAdded()
    }
  }

  return (
        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Írj egy üzenetet..."
        />

        <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition disabled:opacity-50"
        >
            {loading ? '...' : 'Mentés'}
        </button>
        </form>
  )
}