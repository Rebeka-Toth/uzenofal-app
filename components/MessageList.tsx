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
          className="flex justify-between border px-3 py-2 rounded"
        >
          <span>{msg.content}</span>
          <button
            className="text-red-500"
            onClick={() => handleDelete(msg.id)}
          >
            Törlés
          </button>
        </li>
      ))}
    </ul>
  )
}