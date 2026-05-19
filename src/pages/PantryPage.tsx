import { useState, KeyboardEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X, ShoppingBasket, Search, Loader as Loader2 } from 'lucide-react'
import { usePantry } from '../hooks/usePantry'
import { RecipeCard } from '../components/RecipeCard'
import { RecipeModal } from '../components/RecipeModal'
import { RecipeSkeletonGrid } from '../components/RecipeSkeleton'
import { searchMultipleIngredients } from '../services/cocktailApi'
import { Recipe } from '../types'
import { useLang } from '../context/LangContext'

export function PantryPage() {
  const { items, loading: pantryLoading, addItem, removeItem } = usePantry()
  const { t } = useLang()
  const [input, setInput] = useState('')
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [searching, setSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)

  const handleAdd = async () => {
    const val = input.trim()
    if (!val) return
    const parts = val.split(',').map((s) => s.trim()).filter(Boolean)
    for (const p of parts) await addItem(p)
    setInput('')
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') handleAdd()
  }

  const handleSearchPantry = async () => {
    if (items.length === 0) return
    setSearching(true)
    setHasSearched(true)
    setRecipes([])
    const results = await searchMultipleIngredients(items.map((i) => i.ingredient))
    setRecipes(results)
    setSearching(false)
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-11 h-11 bg-accent-100 rounded-2xl flex items-center justify-center">
            <ShoppingBasket className="w-6 h-6 text-accent-600" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-gray-900">{t('pantry_title')}</h1>
            <p className="text-gray-500 text-sm">{t('pantry_subtitle')}</p>
          </div>
        </div>

        {/* Add ingredient */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">{t('pantry_add_label')}</h2>
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t('pantry_add_placeholder')}
              className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition"
            />
            <button
              onClick={handleAdd}
              disabled={!input.trim()}
              className="bg-primary-500 hover:bg-primary-600 disabled:bg-primary-200 text-white px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5 font-medium text-sm"
            >
              <Plus className="w-4 h-4" />
              {t('pantry_add_btn')}
            </button>
          </div>
        </div>

        {/* Pantry items */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-700">
              {t('pantry_your_items')} ({items.length})
            </h2>
            {items.length > 0 && (
              <button
                onClick={handleSearchPantry}
                disabled={searching}
                className="flex items-center gap-2 bg-accent-500 hover:bg-accent-600 disabled:bg-accent-200 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
              >
                {searching ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
                {t('pantry_search_btn')}
              </button>
            )}
          </div>

          {pantryLoading ? (
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-8 w-20 shimmer rounded-full" />
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              <ShoppingBasket className="w-10 h-10 mx-auto mb-2 opacity-40" />
              <p className="text-sm">{t('pantry_empty')}</p>
            </div>
          ) : (
            <AnimatePresence>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="flex items-center gap-1.5 bg-orange-50 text-primary-700 text-sm px-3 py-1.5 rounded-full border border-orange-100 capitalize"
                  >
                    {item.ingredient}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-primary-400 hover:text-primary-700 ml-0.5 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          )}
        </div>

        {/* Results */}
        {searching && <RecipeSkeletonGrid />}

        {!searching && hasSearched && recipes.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <div className="text-4xl mb-3">🍹</div>
            <p className="font-medium text-gray-600">{t('pantry_no_results')}</p>
            <p className="text-sm mt-1">{t('pantry_no_results_sub')}</p>
          </div>
        )}

        {!searching && recipes.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="font-display text-xl font-bold text-gray-900 mb-5">
              {recipes.length} {recipes.length === 1 ? t('pantry_results_title_one') : t('pantry_results_title_many')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {recipes.map((r, i) => (
                <RecipeCard key={r.id} recipe={r} onViewDetails={setSelectedRecipe} index={i} />
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>

      <RecipeModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
    </div>
  )
}
