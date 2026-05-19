import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import { Favorite } from '../types'

export function useFavorites() {
  const { user } = useAuth()
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [loading, setLoading] = useState(false)

  const fetchFavorites = useCallback(async () => {
    if (!user) return
    setLoading(true)
    const { data } = await supabase
      .from('favorites')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
    setFavorites(data ?? [])
    setLoading(false)
  }, [user])

  useEffect(() => {
    fetchFavorites()
  }, [fetchFavorites])

  const isFavorited = (recipeId: string) =>
    favorites.some((f) => f.recipe_id === recipeId)

  const toggleFavorite = async (recipe: { id: string; title: string; image: string; source: string }) => {
    if (!user) return
    if (isFavorited(recipe.id)) {
      await supabase.from('favorites').delete().eq('user_id', user.id).eq('recipe_id', recipe.id)
      setFavorites((prev) => prev.filter((f) => f.recipe_id !== recipe.id))
    } else {
      const { data } = await supabase
        .from('favorites')
        .insert({ user_id: user.id, recipe_id: recipe.id, title: recipe.title, image_url: recipe.image, source: recipe.source })
        .select()
        .single()
      if (data) setFavorites((prev) => [data, ...prev])
    }
  }

  const removeFavorite = async (favoriteId: string) => {
    await supabase.from('favorites').delete().eq('id', favoriteId)
    setFavorites((prev) => prev.filter((f) => f.id !== favoriteId))
  }

  return { favorites, loading, isFavorited, toggleFavorite, removeFavorite, refetch: fetchFavorites }
}
