# FridgeChef – Koktélkereső alkalmazás

> Fedezz fel koktélrecepteket az otthoni hozzávalóid alapján!

---

## Projektleírás

A **FridgeChef** egy modern, webalapú alkalmazás, amely segít a felhasználóknak koktélrecepteket felfedezni azok alapján, hogy éppen milyen hozzávalók állnak rendelkezésükre. A rendszer a nyilvánosan elérhető [TheCocktailDB API](https://www.thecocktaildb.com/api.php) adatbázisát használja a receptek lekérdezéséhez, és Supabase-t a felhasználói adatok tárolásához.

Az alkalmazás két nyelven érhető el: **magyarul** (alapértelmezett) és **angolul**, és a választott nyelv a böngészőben eltárolódik.

---

## Funkciók

### Koktélkeresés
- Hozzávaló(k) megadásával keresés az API-ban
- Keresés koktél neve alapján is
- Több hozzávaló egyszerre megadható (vesszővel elválasztva)
- Gyors javaslatok (vodka, rum, gin stb.) egy kattintással

### Spájz (Pantry)
- Bejelentkezett felhasználók elmenthetik az otthon elérhető hozzávalóikat
- A spájz tartalma alapján egyetlen gombnyomással lehet koktélokat keresni
- Hozzávalók hozzáadása egyenként vagy vesszővel elválasztva, tömeges bevitellel
- Duplikátumok szűrése automatikusan

### Kedvencek
- Receptek mentése szív ikonra kattintva
- A kedvencek listája bármikor megtekinthető
- Kedvencek törlése egyenként

### Felhasználói fiók
- E-mail + jelszó alapú regisztráció és bejelentkezés
- Munkamenet megőrzése (Supabase Auth)
- Védett oldalak (spájz, kedvencek) csak bejelentkezett felhasználóknak elérhetők

### Többnyelvűség
- Magyar és angol felület
- HU / EN kapcsoló a navigációs sávban
- A választott nyelv localStorage-ban tárolódik

---

## Technológiai stack

| Réteg | Technológia |
|---|---|
| Frontend keretrendszer | React 18 + TypeScript |
| Build eszköz | Vite |
| Stílusok | Tailwind CSS |
| Animációk | Framer Motion |
| Ikonok | Lucide React |
| Routing | React Router v6 |
| Backend / adatbázis | Supabase (PostgreSQL) |
| Hitelesítés | Supabase Auth (email/jelszó) |
| Külső API | TheCocktailDB REST API |

---

## Adatbázis-struktúra

Az alkalmazás két Supabase táblát használ, mindkettőn Row Level Security (RLS) engedélyezett, így a felhasználók kizárólag saját adataikhoz férhetnek hozzá.

### `pantry_items`
| Oszlop | Típus | Leírás |
|---|---|---|
| `id` | uuid | Elsődleges kulcs |
| `user_id` | uuid | Felhasználó azonosítója (auth.users) |
| `ingredient` | text | Hozzávaló neve (kisbetűsítve) |
| `created_at` | timestamptz | Létrehozás időpontja |

### `favorites`
| Oszlop | Típus | Leírás |
|---|---|---|
| `id` | uuid | Elsődleges kulcs |
| `user_id` | uuid | Felhasználó azonosítója |
| `recipe_id` | text | Külső API azonosítója a receptnek |
| `title` | text | Recept neve |
| `image_url` | text | Recept képének URL-je |
| `source` | text | Forrás (`cocktail`) |
| `created_at` | timestamptz | Mentés időpontja |

---

## Projektstruktúra

```
src/
├── components/
│   ├── Navbar.tsx          # Navigációs sáv, nyelváltó
│   ├── ProtectedRoute.tsx  # Védett útvonal-komponens
│   ├── RecipeCard.tsx      # Recept kártya (kedvenc gombbal)
│   ├── RecipeModal.tsx     # Recept részletes nézet (modal)
│   └── RecipeSkeleton.tsx  # Betöltési skeleton animáció
├── context/
│   ├── AuthContext.tsx     # Hitelesítési állapot kezelése
│   └── LangContext.tsx     # Nyelvválasztó context
├── hooks/
│   ├── useFavorites.ts     # Kedvencek CRUD logika
│   └── usePantry.ts        # Spájz CRUD logika
├── i18n/
│   └── translations.ts     # Magyar és angol fordítások
├── lib/
│   └── supabase.ts         # Supabase kliens inicializálás
├── pages/
│   ├── HomePage.tsx        # Főoldal (keresés)
│   ├── LoginPage.tsx       # Bejelentkezési oldal
│   ├── RegisterPage.tsx    # Regisztrációs oldal
│   ├── PantryPage.tsx      # Spájz kezelő oldal
│   └── FavoritesPage.tsx   # Kedvencek oldal
├── services/
│   └── cocktailApi.ts      # TheCocktailDB API hívások
└── types/
    └── index.ts            # TypeScript típusdefiníciók
```

---

## Telepítés és futtatás

### Előfeltételek
- Node.js 18+
- npm

### Lépések

```bash
# Függőségek telepítése
npm install

# Fejlesztői szerver indítása
npm run dev

# Produkciós build
npm run build
```

### Környezeti változók

A `.env` fájlban a következő változók szükségesek:

```env
VITE_SUPABASE_URL=https://<projekt-id>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon-kulcs>
```

---

## Csapattagok és munkamegosztás

### Jakab Gábor
- A projekt alaparchitektúrájának megtervezése és felállítása (Vite + React + TypeScript konfiguráció)
- TheCocktailDB API integráció: `cocktailApi.ts` megírása (keresés hozzávaló és név alapján, részletes recept lekérdezés, több hozzávaló párhuzamos keresése)
- `HomePage` megvalósítása: hero szekció, keresőmező, gyors javaslatok, találati rács
- `RecipeCard` és `RecipeModal` komponensek fejlesztése
- Tailwind CSS konfiguráció és az alkalmazás vizuális design rendszerének kialakítása (színpaletta, tipográfia, spacing)

### Széplaki Szabolcs
- Supabase backend beállítása: adatbázis séma tervezése és migrációs fájl megírása (`pantry_items`, `favorites` táblák, RLS policy-k, indexek)
- Supabase Auth integráció: `AuthContext` megírása, regisztráció / bejelentkezés / kijelentkezés folyamatok
- `usePantry` és `useFavorites` custom hookok fejlesztése (CRUD műveletek, optimista UI frissítés)
- `PantryPage` fejlesztése: hozzávalók kezelése, tömeges bevitel, spájz alapú keresés
- `FavoritesPage` fejlesztése: mentett receptek megjelenítése és törlése
- `ProtectedRoute` komponens és útvonalvédelem megvalósítása

### Barkaszi Tamás
- Teljes kétnyelvű (magyar/angol) fordítási rendszer tervezése és implementálása (`translations.ts`, `LangContext`)
- `Navbar` újratervezése: reszponzív elrendezés, görgetés-érzékeny megjelenés (átlátszó → fehér átmenet), HU/EN kapcsoló
- `LoginPage` és `RegisterPage` UI megvalósítása (validáció, hibaüzenetek, jelszó megjelenítés váltó)
- `RecipeSkeleton` betöltési animáció komponens
- Reszponzív design finomhangolása mobil és tablet nézetekhez
- Framer Motion animációk integrálása az egész alkalmazásban (lapváltások, kártyák, modal)

---

## Fejlesztés során használt promptok

A projektet AI-asszisztens segítségével fejlesztettük. Az alábbiakban néhány jellemző prompt látható, amelyeket a fejlesztés különböző fázisaiban használtunk.

### Alap funkciók

> "Készíts egy React + TypeScript + Vite projektet, ahol a felhasználó hozzávalókat adhat meg és koktélrecepteket kap vissza a TheCocktailDB API alapján."

> "Adj hozzá Supabase autentikációt email/jelszó alapon, legyen regisztrációs és bejelentkezési oldal, a spájz és kedvencek oldalak csak bejelentkezett felhasználóknak legyenek elérhetők."

> "Hozz létre egy Supabase táblát a felhasználók spájzának tárolásához, és egy másikat a kedvenc receptekhez. Mindkét táblán legyen RLS engedélyezve."

> "Legyen lehetőség több hozzávalót egyszerre megadni vesszővel elválasztva, és az összes hozzávalóra egyszerre keressen az API-ban, az eredményeket szűrd duplikátumokra."

### UI / design

> "A navigációs sáv a hero képen legyen átlátszó fehér szöveggel, görgetés után váltson fehér háttérre sötét szöveggel, az átmenet legyen animált."

> "Adj hozzá skeleton loading animációt a receptkártyák helyére amíg az API kérés fut."

> "Csináld meg a kedvencek gombot a kártyán – teli szív ha el van mentve, üres ha nincs, és legyen egy kis animáció kattintáskor."

### Bug fixek

> "A regisztrációs oldal 401-es hibát dob, de a Supabase URL helyes. Nézd meg hogy a supabase.ts a megfelelő environment variable-t olvassa-e."

> "A keresés elszáll egy `drinks.map is not a function` hibával ha az API nem talál eredményt. Javítsd ki, hogy üres tömböt adjon vissza ilyenkor."

> "A spájzhoz adott hozzávaló duplikátumként jelenik meg ha más a kis/nagybetűs írásmód. Normalizáld lowercase-re mentés előtt."

> "A kedvencek oldal nem frissül automatikusan ha kiveszek egy elemet, csak újratöltés után tűnik el. Javítsd ki az optimista UI frissítést."

### Többnyelvűség

> "Adj hozzá magyar és angol nyelvi támogatást, legyen egy HU/EN kapcsoló a navbaron, és a választott nyelvet mentse el localStorage-ba."

---

## Licenc

Ez a projekt oktatási célra készült.

