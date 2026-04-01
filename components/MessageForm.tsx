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
    <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
      <input
        type="text"
        className="flex-1 border px-3 py-2 rounded"
        placeholder="Írj egy üzenetet..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Mentés...' : 'Mentés'}
      </button>
    </form>
  )
}