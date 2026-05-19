import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChefHat, Heart, ShoppingBasket, LogOut, Menu, X, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'

export function Navbar() {
  const { user, signOut } = useAuth()
  const { lang, setLang, t } = useLang()
  const location = useLocation()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const isActive = (path: string) => location.pathname === path

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-orange-100'
          : 'bg-gradient-to-b from-black/50 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center group-hover:bg-primary-600 transition-colors">
              <ChefHat className="w-5 h-5 text-white" />
            </div>
            <span className={`font-display font-bold text-lg hidden sm:block transition-colors duration-300 ${scrolled ? 'text-gray-900' : 'text-white'}`}>
              Fridge<span className="text-primary-400">Chef</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink to="/" active={isActive('/')} scrolled={scrolled}>
              {t('nav_search')}
            </NavLink>
            {user && (
              <>
                <NavLink to="/pantry" active={isActive('/pantry')} scrolled={scrolled}>
                  <ShoppingBasket className="w-4 h-4" />
                  {t('nav_pantry')}
                </NavLink>
                <NavLink to="/favorites" active={isActive('/favorites')} scrolled={scrolled}>
                  <Heart className="w-4 h-4" />
                  {t('nav_favorites')}
                </NavLink>
              </>
            )}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            <LangToggle lang={lang} setLang={setLang} scrolled={scrolled} />

            {user ? (
              <div className="flex items-center gap-3">
                <div className={`flex items-center gap-2 text-sm transition-colors duration-300 ${scrolled ? 'text-gray-600' : 'text-white/90'}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-300 ${scrolled ? 'bg-primary-100' : 'bg-white/20'}`}>
                    <User className={`w-4 h-4 transition-colors duration-300 ${scrolled ? 'text-primary-600' : 'text-white'}`} />
                  </div>
                  <span className="hidden lg:block truncate max-w-[120px]">{user.email}</span>
                </div>
                <button
                  onClick={handleSignOut}
                  className={`flex items-center gap-1.5 text-sm transition-colors duration-300 px-3 py-1.5 rounded-lg ${
                    scrolled
                      ? 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <LogOut className="w-4 h-4" />
                  {t('nav_signout')}
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`text-sm transition-colors duration-300 px-3 py-1.5 rounded-lg font-medium ${
                    scrolled
                      ? 'text-gray-600 hover:text-primary-600 hover:bg-orange-50'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {t('nav_login')}
                </Link>
                <Link
                  to="/register"
                  className="text-sm bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors font-medium"
                >
                  {t('nav_register')}
                </Link>
              </>
            )}
          </div>

          {/* Mobile: lang toggle + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <LangToggle lang={lang} setLang={setLang} scrolled={scrolled} />
            <button
              className={`p-2 rounded-lg transition-colors ${scrolled ? 'text-gray-600 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 shadow-lg"
          >
            <div className="px-4 py-3 space-y-1">
              <MobileNavLink to="/">{t('nav_search')}</MobileNavLink>
              {user && (
                <>
                  <MobileNavLink to="/pantry">
                    <ShoppingBasket className="w-4 h-4" /> {t('nav_pantry')}
                  </MobileNavLink>
                  <MobileNavLink to="/favorites">
                    <Heart className="w-4 h-4" /> {t('nav_favorites')}
                  </MobileNavLink>
                </>
              )}
              <div className="pt-2 border-t border-gray-100 mt-2">
                {user ? (
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                  >
                    <LogOut className="w-4 h-4" /> {t('nav_signout')}
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <Link to="/login" className="flex-1 text-center px-3 py-2 text-sm text-gray-700 border border-gray-200 rounded-lg">
                      {t('nav_login')}
                    </Link>
                    <Link to="/register" className="flex-1 text-center px-3 py-2 text-sm text-white bg-primary-500 rounded-lg">
                      {t('nav_register')}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

function LangToggle({ lang, setLang, scrolled }: { lang: string; setLang: (l: 'hu' | 'en') => void; scrolled: boolean }) {
  return (
    <div className={`flex items-center rounded-lg p-0.5 gap-0.5 transition-colors duration-300 ${scrolled ? 'bg-gray-100' : 'bg-white/15'}`}>
      <button
        onClick={() => setLang('hu')}
        className={`text-xs font-semibold px-2.5 py-1 rounded-md transition-all duration-200 ${
          lang === 'hu'
            ? scrolled ? 'bg-white text-primary-600 shadow-sm' : 'bg-white/25 text-white shadow-sm'
            : scrolled ? 'text-gray-500 hover:text-gray-700' : 'text-white/70 hover:text-white'
        }`}
      >
        HU
      </button>
      <button
        onClick={() => setLang('en')}
        className={`text-xs font-semibold px-2.5 py-1 rounded-md transition-all duration-200 ${
          lang === 'en'
            ? scrolled ? 'bg-white text-primary-600 shadow-sm' : 'bg-white/25 text-white shadow-sm'
            : scrolled ? 'text-gray-500 hover:text-gray-700' : 'text-white/70 hover:text-white'
        }`}
      >
        EN
      </button>
    </div>
  )
}

function NavLink({ to, active, scrolled, children }: { to: string; active: boolean; scrolled: boolean; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
        active
          ? scrolled ? 'text-primary-600 bg-primary-50' : 'text-white bg-white/20'
          : scrolled ? 'text-gray-600 hover:text-primary-600 hover:bg-orange-50' : 'text-white/85 hover:text-white hover:bg-white/10'
      }`}
    >
      {children}
    </Link>
  )
}

function MobileNavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
    >
      {children}
    </Link>
  )
}
