import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart, ChefHat, List } from 'lucide-react'
import { Recipe } from '../types'
import { useAuth } from '../context/AuthContext'
import { useFavorites } from '../hooks/useFavorites'
import { useLang } from '../context/LangContext'
import { getRecipeById } from '../services/cocktailApi'

interface Props {
  recipe: Recipe | null
  onClose: () => void
}

export function RecipeModal({ recipe, onClose }: Props) {
  const { user } = useAuth()
  const { isFavorited, toggleFavorite } = useFavorites()
  const { t } = useLang()
  const [detailed, setDetailed] = useState<Recipe | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!recipe) return
    setDetailed(null)
    setLoading(true)
    getRecipeById(recipe.id).then((r) => {
      setDetailed(r)
      setLoading(false)
    })
  }, [recipe?.id])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const data = detailed ?? recipe
  const favorited = data ? isFavorited(data.id) : false

  const handleFavorite = async () => {
    if (!user || !data) return
    await toggleFavorite({ id: data.id, title: data.title, image: data.image, source: data.source })
  }

  return (
    <AnimatePresence>
      {recipe && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            className="relative bg-white w-full sm:max-w-2xl sm:rounded-3xl rounded-t-3xl overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-56 sm:h-72 flex-shrink-0">
              {data?.image && (
                <img src={data.image} alt={data.title} className="w-full h-full object-cover" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4 right-14">
                <h2 className="text-white font-display text-xl font-bold leading-tight">{data?.title}</h2>
                {data?.category && (
                  <span className="text-white/80 text-sm">{data.category}</span>
                )}
              </div>
              {user && (
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={handleFavorite}
                  className={`absolute bottom-4 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-colors ${
                    favorited ? 'bg-red-500 text-white' : 'bg-white text-gray-400 hover:text-red-400'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${favorited ? 'fill-current' : ''}`} />
                </motion.button>
              )}
            </div>

            <div className="overflow-y-auto flex-1 p-5 space-y-5">
              {loading ? (
                <div className="space-y-3">
                  <div className="h-4 shimmer rounded w-3/4" />
                  <div className="h-4 shimmer rounded w-full" />
                  <div className="h-4 shimmer rounded w-2/3" />
                </div>
              ) : (
                <>
                  {data?.ingredients && data.ingredients.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <ChefHat className="w-4 h-4 text-primary-500" />
                        <h3 className="font-semibold text-gray-900">{t('modal_ingredients')}</h3>
                      </div>
                      <ul className="grid grid-cols-2 gap-2">
                        {data.ingredients.map((ing, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary-400 flex-shrink-0" />
                            {ing}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {data?.instructions && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <List className="w-4 h-4 text-accent-500" />
                        <h3 className="font-semibold text-gray-900">{t('modal_instructions')}</h3>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{data.instructions}</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
