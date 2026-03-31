'use client'  // required for client-side interactivity in Next.js App Router

import { useState } from 'react'
import { addMessage } from '../services/messageService'

export default function MessageForm({ onMessageAdded }: { onMessageAdded: () => void }) {
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!content.trim()) return

        setLoading(true)
        const result = await addMessage(content)
        setLoading(false)

        if (result) {
            setContent('')       // clear input
            onMessageAdded()     // notify parent to refresh messages
        } else {
            alert('Hiba történt az üzenet mentésekor.')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-2">
            <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Írj egy üzenetet..."
                className="flex-1 border rounded px-3 py-2"
            />
            <button
                type="submit"
                disabled={loading}
                className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
                {loading ? 'Mentés...' : 'Mentés'}
            </button>
        </form>
    )
}