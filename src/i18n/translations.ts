export type Lang = 'hu' | 'en'

export const translations = {
  hu: {
    // Navbar
    nav_search: 'Keresés',
    nav_pantry: 'Spájzom',
    nav_favorites: 'Kedvencek',
    nav_login: 'Bejelentkezés',
    nav_register: 'Regisztráció',
    nav_signout: 'Kijelentkezés',

    // HomePage
    hero_badge: 'Fedezz fel koktélokat az itthoni hozzávalókból',
    hero_title: 'Mi van a',
    hero_title_highlight: 'hűtődben?',
    hero_subtitle: 'Írd be a hozzávalókat, és fedezz fel csodás koktélokat & italokat, amiket most rögtön elkészíthetsz.',
    hero_placeholder: 'pl. vodka, citrom, menta...',
    hero_search_btn: 'Keresés',
    hero_try: 'Próbáld:',
    hero_pantry_link: 'Vagy keress a Spájzom alapján →',
    results_count_one: 'koktél található',
    results_count_many: 'koktél található',
    no_results_title: 'Nem találtunk koktélt',
    no_results_sub: 'Próbálj más hozzávalókat, vagy ellenőrizd a helyesírást.',

    // RecipeCard
    card_view: 'Részletek',

    // RecipeModal
    modal_ingredients: 'Hozzávalók',
    modal_instructions: 'Elkészítés',

    // PantryPage
    pantry_title: 'Spájzom',
    pantry_subtitle: 'Kezeld az elérhető hozzávalóidat',
    pantry_add_label: 'Hozzávaló hozzáadása',
    pantry_add_placeholder: 'pl. vodka, citrom, menta (vesszővel elválasztva)',
    pantry_add_btn: 'Hozzáad',
    pantry_your_items: 'Hozzávalóid',
    pantry_search_btn: 'Keresés a spájz alapján',
    pantry_empty: 'A spájzod üres. Kezdj el hozzávalókat hozzáadni!',
    pantry_results_title_one: 'koktél a spájzodból',
    pantry_results_title_many: 'koktél a spájzodból',
    pantry_no_results: 'Nem találtunk koktélt a hozzávalóidhoz.',
    pantry_no_results_sub: 'Próbálj több hozzávalót hozzáadni!',

    // FavoritesPage
    favorites_title: 'Kedvencek',
    favorites_subtitle: 'Elmentett koktélreceptjeid',
    favorites_saved_one: 'elmentett recept',
    favorites_saved_many: 'elmentett recept',
    favorites_empty_title: 'Még nincsenek kedvencek',
    favorites_empty_sub: 'Keress koktélokat, és kattints a szív ikonra a mentéshez.',
    favorites_view_btn: 'Recept megtekintése',

    // LoginPage
    login_title: 'Üdvözlünk vissza',
    login_subtitle: 'Jelentkezz be a fiókodba',
    login_email: 'E-mail',
    login_password: 'Jelszó',
    login_placeholder_email: 'te@pelda.hu',
    login_placeholder_password: 'Jelszavad',
    login_btn: 'Bejelentkezés',
    login_loading: 'Bejelentkezés...',
    login_no_account: 'Nincs még fiókod?',
    login_signup_link: 'Regisztrálj',
    login_fill_all: 'Kérjük, töltsd ki az összes mezőt.',

    // RegisterPage
    register_title: 'Fiók létrehozása',
    register_subtitle: 'Regisztrálj a spájz & kedvencek funkcióhoz',
    register_email: 'E-mail',
    register_password: 'Jelszó',
    register_confirm: 'Jelszó megerősítése',
    register_placeholder_email: 'te@pelda.hu',
    register_placeholder_password: 'Min. 6 karakter',
    register_placeholder_confirm: 'Ismételd meg a jelszót',
    register_btn: 'Fiók létrehozása',
    register_loading: 'Létrehozás...',
    register_success_title: 'Fiók létrehozva!',
    register_success_sub: 'Átirányítunk az alkalmazásba...',
    register_has_account: 'Már van fiókod?',
    register_login_link: 'Jelentkezz be',
    register_fill_all: 'Kérjük, töltsd ki az összes mezőt.',
    register_min_password: 'A jelszónak legalább 6 karakterből kell állnia.',
    register_password_mismatch: 'A jelszavak nem egyeznek.',
  },
  en: {
    // Navbar
    nav_search: 'Search',
    nav_pantry: 'My Pantry',
    nav_favorites: 'Favorites',
    nav_login: 'Log in',
    nav_register: 'Sign up',
    nav_signout: 'Sign out',

    // HomePage
    hero_badge: 'Discover cocktails from what you have',
    hero_title: "What's in your",
    hero_title_highlight: 'Fridge?',
    hero_subtitle: 'Type ingredients you have and discover amazing cocktails & drinks you can make right now.',
    hero_placeholder: 'e.g. vodka, lemon, mint...',
    hero_search_btn: 'Search',
    hero_try: 'Try:',
    hero_pantry_link: 'Or search using My Pantry →',
    results_count_one: 'cocktail found',
    results_count_many: 'cocktails found',
    no_results_title: 'No cocktails found',
    no_results_sub: 'Try different ingredients or check the spelling.',

    // RecipeCard
    card_view: 'View Details',

    // RecipeModal
    modal_ingredients: 'Ingredients',
    modal_instructions: 'Instructions',

    // PantryPage
    pantry_title: 'My Pantry',
    pantry_subtitle: 'Manage your available ingredients',
    pantry_add_label: 'Add ingredients',
    pantry_add_placeholder: 'e.g. vodka, lemon, mint (comma-separated)',
    pantry_add_btn: 'Add',
    pantry_your_items: 'Your ingredients',
    pantry_search_btn: 'Search using my pantry',
    pantry_empty: 'Your pantry is empty. Start adding ingredients!',
    pantry_results_title_one: 'cocktail from your pantry',
    pantry_results_title_many: 'cocktails from your pantry',
    pantry_no_results: 'No cocktails found for your pantry items.',
    pantry_no_results_sub: 'Try adding more ingredients!',

    // FavoritesPage
    favorites_title: 'Favorites',
    favorites_subtitle: 'Your saved cocktail recipes',
    favorites_saved_one: 'saved recipe',
    favorites_saved_many: 'saved recipes',
    favorites_empty_title: 'No favorites yet',
    favorites_empty_sub: 'Search for cocktails and tap the heart icon to save them here.',
    favorites_view_btn: 'View Recipe',

    // LoginPage
    login_title: 'Welcome back',
    login_subtitle: 'Sign in to your account',
    login_email: 'Email',
    login_password: 'Password',
    login_placeholder_email: 'you@example.com',
    login_placeholder_password: 'Your password',
    login_btn: 'Sign in',
    login_loading: 'Signing in...',
    login_no_account: "Don't have an account?",
    login_signup_link: 'Sign up',
    login_fill_all: 'Please fill in all fields.',

    // RegisterPage
    register_title: 'Create account',
    register_subtitle: 'Join to save your pantry & favorites',
    register_email: 'Email',
    register_password: 'Password',
    register_confirm: 'Confirm password',
    register_placeholder_email: 'you@example.com',
    register_placeholder_password: 'Min. 6 characters',
    register_placeholder_confirm: 'Repeat your password',
    register_btn: 'Create account',
    register_loading: 'Creating account...',
    register_success_title: 'Account created!',
    register_success_sub: 'Redirecting you to the app...',
    register_has_account: 'Already have an account?',
    register_login_link: 'Sign in',
    register_fill_all: 'Please fill in all fields.',
    register_min_password: 'Password must be at least 6 characters.',
    register_password_mismatch: 'Passwords do not match.',
  },
} as const

export type TranslationKey = keyof typeof translations.hu
