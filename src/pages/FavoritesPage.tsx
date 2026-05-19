import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Trash2 } from 'lucide-react'
import { useFavorites } from '../hooks/useFavorites'
import { RecipeModal } from '../components/RecipeModal'
import { Recipe } from '../types'
import { useLang } from '../context/LangContext'

export function FavoritesPage() {
  const { favorites, loading, removeFavorite } = useFavorites()
  const { t } = useLang()
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({})

  const handleView = (fav: typeof favorites[0]) => {
    setSelectedRecipe({
      id: fav.recipe_id,
      title: fav.title,
      image: fav.image_url,
      source: fav.source as 'cocktail' | 'meal',
    })
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-11 h-11 bg-red-50 rounded-2xl flex items-center justify-center">
            <Heart className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-gray-900">{t('favorites_title')}</h1>
            <p className="text-gray-500 text-sm">{t('favorites_subtitle')}</p>
          </div>
        </div>

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <div className="aspect-[4/3] shimmer" />
                <div className="p-4 space-y-3">
                  <div className="h-4 shimmer rounded w-full" />
                  <div className="h-4 shimmer rounded w-3/4" />
                  <div className="h-9 shimmer rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && favorites.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-10 h-10 text-red-300" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-1">{t('favorites_empty_title')}</h3>
            <p className="text-gray-500 text-sm">{t('favorites_empty_sub')}</p>
          </div>
        )}

        {!loading && favorites.length > 0 && (
          <>
            <p className="text-sm text-gray-500 mb-5">
              {favorites.length} {favorites.length === 1 ? t('favorites_saved_one') : t('favorites_saved_many')}
            </p>
            <AnimatePresence>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {favorites.map((fav, i) => (
                  <motion.div
                    key={fav.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: i * 0.04 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {!imgErrors[fav.id] ? (
                        <img
                          src={fav.image_url}
                          alt={fav.title}
                          onError={() => setImgErrors((p) => ({ ...p, [fav.id]: true }))}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
                          <span className="text-4xl">🍹</span>
                        </div>
                      )}
                      <button
                        onClick={() => removeFavorite(fav.id)}
                        className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-red-400 hover:bg-red-500 hover:text-white transition-all shadow"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="font-semibold text-gray-900 line-clamp-2 mb-3 flex-1 leading-snug">
                        {fav.title}
                      </h3>
                      <button
                        onClick={() => handleView(fav)}
                        className="w-full py-2.5 bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium rounded-xl transition-colors"
                      >
                        {t('favorites_view_btn')}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          </>
        )}
      </motion.div>

      <RecipeModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
    </div>
  )
}
