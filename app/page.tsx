'use client'

import MessageForm from '../components/MessageForm'
import MessageList from '../components/MessageList'
import { useState } from 'react'

export default function Home() {
  const [refresh, setRefresh] = useState(false)

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Üzenőfal
        </h1>

        <MessageForm onMessageAdded={() => setRefresh(!refresh)} />
        <MessageList key={refresh ? 'refresh' : 'stable'} />
      </div>
    </main>
  )
}