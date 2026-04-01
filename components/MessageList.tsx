'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

type Message = {
  id: number
  content: string
  created_at: string
}

export default function MessageList() {
  const [messages, setMessages] = useState<Message[]>([])

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) {
      alert('Error fetching messages: ' + error.message)
    } else {
      setMessages(data)
    }
  }

  const handleDelete = async (id: number) => {
    const { error } = await supabase.from('messages').delete().eq('id', id)
    if (error) {
      alert('Error deleting message: ' + error.message)
    } else {
      fetchMessages()
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  return (
    <ul className="space-y-2">
        {messages.map((msg) => (
            <li
            key={msg.id}
            className="flex justify-between items-center bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg"
            >
            <span className="text-gray-800">{msg.content}</span>

            <button
                onClick={() => handleDelete(msg.id)}
                className="text-gray-400 hover:text-red-500 transition text-lg font-bold"
            >
                ×
            </button>
            </li>
        ))}
        </ul>
  )
}