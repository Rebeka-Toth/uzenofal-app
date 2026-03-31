import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function getMessages() {
    const { data, error } = await supabase
        .from('messages')
        .select('*')
    if (error) {
        console.error('Error fetching messages:', error)
        return null
    }
    return data
}

export async function addMessage(content: string) {
    const { data, error } = await supabase
        .from('messages')
        .insert([{ content }])
    if (error) {
        console.error('Error adding message:', error)
        return null
    }
    return data
}

export async function deleteMessage(id: string) {
    const { error } = await supabase
        .from('messages')
        .delete()
        .eq('id', id)
    if (error) {
        console.error('Error deleting message:', error)
        return false
    }
    return true
}