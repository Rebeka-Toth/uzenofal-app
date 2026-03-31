'use client'

import { useEffect, useState } from 'react'
import { getMessages, deleteMessage } from '../services/messageService'

interface Message {
    id: string
    content: string
    created_at: string
}

export default function MessageList() {
    const [messages, setMessages] = useState<Message[]>([])
    const [loading, setLoading] = useState(true)

    const fetchMessages = async () => {
        setLoading(true)
        const data = await getMessages()
        if (data) {
            // sort in reverse chronological order
            const sorted = data.sort(
                (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            )
            setMessages(sorted)
        }
        setLoading(false)
    }

    const handleDelete = async (id: string) => {
        const confirmed = confirm('Biztosan törlöd ezt az üzenetet?')
        if (!confirmed) return

        const success = await deleteMessage(id)
        if (success) {
            setMessages(messages.filter((msg) => msg.id !== id))
        } else {
            alert('Hiba történt a törléskor.')
        }
    }

    useEffect(() => {
        fetchMessages()
    }, [])

    if (loading) return <p>Üzenetek betöltése...</p>

    return (
        <ul className="space-y-2 mt-4">
            {messages.map((msg) => (
                <li key={msg.id} className="flex justify-between items-center border px-3 py-2 rounded">
                    <span>{msg.content}</span>
                    <button
                        onClick={() => handleDelete(msg.id)}
                        className="text-red-500 hover:underline"
                    >
                        Törlés
          </button>
                </li>
            ))}
        </ul>
    )
}