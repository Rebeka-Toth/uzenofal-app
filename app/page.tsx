import MessageForm from '../components/MessageForm'
import MessageList from '../components/MessageList'
import { useState } from 'react'

export default function Home() {
  const [refresh, setRefresh] = useState(false)

  return (
    <main className="max-w-md mx-auto mt-10">
      <MessageForm onMessageAdded={() => setRefresh(!refresh)} />
      <MessageList key={refresh ? 'refresh' : 'stable'} />
    </main>
  )
}