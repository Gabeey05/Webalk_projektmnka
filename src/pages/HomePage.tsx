import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Search, Sparkles, ArrowRight } from 'lucide-react'
import { RecipeCard } from '../components/RecipeCard'
import { RecipeModal } from '../components/RecipeModal'
import { RecipeSkeletonGrid } from '../components/RecipeSkeleton'
import { searchMultipleIngredients, searchByName } from '../services/cocktailApi'
import { Recipe } from '../types'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'

const HERO_IMAGE = 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1920'
const SUGGESTED = ['vodka', 'rum', 'gin', 'lemon', 'mint', 'tequila', 'lime']

export function HomePage() {
  const { user } = useAuth()
  const { t } = useLang()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  const handleSearch = async (searchQuery?: string) => {
    const q = (searchQuery ?? query).trim()
    if (!q) return
    setLoading(true)
    setSearched(true)
    setRecipes([])
    const ingredients = q.split(',').map((s) => s.trim()).filter(Boolean)
    let results: Recipe[]
    if (ingredients.length > 1) {
      results = await searchMultipleIngredients(ingredients)
    } else {
      const [byIngredient, byName] = await Promise.all([
        searchMultipleIngredients(ingredients),
        searchByName(q),
      ])
      const map = new Map<string, Recipe>()
      ;[...byIngredient, ...byName].forEach((r) => map.set(r.id, r))
      results = Array.from(map.values())
    }
    setRecipes(results)
    setLoading(false)
    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
  }

  const handleSuggestion = (s: string) => {
    setQuery(s)
    handleSearch(s)
  }

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="Food" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-cream-100" />
        </div>

        <div className="relative z-10 text-center px-4 w-full max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-sm px-4 py-1.5 rounded-full mb-5 border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              {t('hero_badge')}
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              {t('hero_title')}{' '}
              <span className="text-primary-400">{t('hero_title_highlight')}</span>
            </h1>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              {t('hero_subtitle')}
            </p>
          </motion.div>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative flex gap-2 bg-white rounded-2xl shadow-2xl p-2 max-w-2xl mx-auto"
          >
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder={t('hero_placeholder')}
              className="flex-1 pl-11 pr-2 py-3 text-gray-900 placeholder-gray-400 bg-transparent outline-none text-base"
            />
            <button
              onClick={() => handleSearch()}
              disabled={!query.trim() || loading}
              className="bg-primary-500 hover:bg-primary-600 disabled:bg-primary-300 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200 flex items-center gap-2"
            >
              {t('hero_search_btn')}
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Suggestions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-2 mt-4"
          >
            <span className="text-white/60 text-sm self-center">{t('hero_try')}</span>
            {SUGGESTED.map((s) => (
              <button
                key={s}
                onClick={() => handleSuggestion(s)}
                className="text-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 px-3 py-1 rounded-full transition-colors capitalize"
              >
                {s}
              </button>
            ))}
          </motion.div>

          {user && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-5"
            >
              <button
                onClick={() => navigate('/pantry')}
                className="text-white/70 hover:text-white text-sm underline underline-offset-2 transition-colors"
              >
                {t('hero_pantry_link')}
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Results */}
      <section ref={resultsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading && <RecipeSkeletonGrid />}

        {!loading && searched && recipes.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-5xl mb-4">🍹</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-1">{t('no_results_title')}</h3>
            <p className="text-gray-500">{t('no_results_sub')}</p>
          </motion.div>
        )}

        {!loading && recipes.length > 0 && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-between mb-6"
            >
              <h2 className="text-xl font-display font-bold text-gray-900">
                {recipes.length} {recipes.length === 1 ? t('results_count_one') : t('results_count_many')}
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {recipes.map((r, i) => (
                <RecipeCard key={r.id} recipe={r} onViewDetails={setSelectedRecipe} index={i} />
              ))}
            </div>
          </>
        )}
      </section>

      <RecipeModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
    </>
  )
}
