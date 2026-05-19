import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import { PantryItem } from '../types'

export function usePantry() {
  const { user } = useAuth()
  const [items, setItems] = useState<PantryItem[]>([])
  const [loading, setLoading] = useState(false)

  const fetchItems = useCallback(async () => {
    if (!user) return
    setLoading(true)
    const { data } = await supabase
      .from('pantry_items')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
    setItems(data ?? [])
    setLoading(false)
  }, [user])

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  const addItem = async (ingredient: string) => {
    if (!user) return
    const trimmed = ingredient.trim().toLowerCase()
    if (!trimmed || items.some((i) => i.ingredient === trimmed)) return
    const { data } = await supabase
      .from('pantry_items')
      .insert({ user_id: user.id, ingredient: trimmed })
      .select()
      .single()
    if (data) setItems((prev) => [data, ...prev])
  }

  const removeItem = async (id: string) => {
    await supabase.from('pantry_items').delete().eq('id', id)
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  return { items, loading, addItem, removeItem }
}
