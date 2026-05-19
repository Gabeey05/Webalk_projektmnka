import { motion } from 'framer-motion'
import { Heart, Eye } from 'lucide-react'
import { Recipe } from '../types'
import { useAuth } from '../context/AuthContext'
import { useFavorites } from '../hooks/useFavorites'
import { useLang } from '../context/LangContext'
import { useState } from 'react'

interface Props {
  recipe: Recipe
  onViewDetails: (recipe: Recipe) => void
  index?: number
}

export function RecipeCard({ recipe, onViewDetails, index = 0 }: Props) {
  const { user } = useAuth()
  const { isFavorited, toggleFavorite } = useFavorites()
  const { t } = useLang()
  const [imgError, setImgError] = useState(false)
  const favorited = isFavorited(recipe.id)

  const handleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!user) return
    await toggleFavorite({ id: recipe.id, title: recipe.title, image: recipe.image, source: recipe.source })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group flex flex-col"
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        {!imgError ? (
          <img
            src={recipe.image}
            alt={recipe.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
            <span className="text-4xl">🍹</span>
          </div>
        )}
        {recipe.category && (
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-700 px-2.5 py-1 rounded-full">
            {recipe.category}
          </span>
        )}
        {user && (
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={handleFavorite}
            className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center shadow transition-all duration-200 ${
              favorited
                ? 'bg-red-500 text-white'
                : 'bg-white/90 backdrop-blur-sm text-gray-400 hover:text-red-400'
            }`}
          >
            <Heart className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
          </motion.button>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-gray-900 line-clamp-2 mb-3 flex-1 leading-snug">
          {recipe.title}
        </h3>
        <button
          onClick={() => onViewDetails(recipe)}
          className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium rounded-xl transition-colors duration-200"
        >
          <Eye className="w-4 h-4" />
          {t('card_view')}
        </button>
      </div>
    </motion.div>
  )
}
