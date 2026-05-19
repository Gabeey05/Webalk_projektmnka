import { Recipe } from '../types'

const BASE = 'https://www.thecocktaildb.com/api/json/v1/1'

interface CocktailRaw {
  idDrink: string
  strDrink: string
  strDrinkThumb: string
  strCategory?: string
  strInstructions?: string
  [key: string]: string | null | undefined
}

function parseIngredients(c: CocktailRaw): string[] {
  const ingredients: string[] = []
  for (let i = 1; i <= 15; i++) {
    const ingredient = c[`strIngredient${i}`]
    const measure = c[`strMeasure${i}`]
    if (ingredient) {
      ingredients.push(measure ? `${measure.trim()} ${ingredient.trim()}` : ingredient.trim())
    }
  }
  return ingredients
}

function toRecipe(c: CocktailRaw): Recipe {
  return {
    id: c.idDrink,
    title: c.strDrink,
    image: c.strDrinkThumb,
    source: 'cocktail',
    category: c.strCategory,
    instructions: c.strInstructions ?? undefined,
    ingredients: parseIngredients(c),
  }
}

export async function searchByIngredient(ingredient: string): Promise<Recipe[]> {
  const res = await fetch(`${BASE}/filter.php?i=${encodeURIComponent(ingredient)}`)
  const json = await res.json()
  if (!json.drinks || !Array.isArray(json.drinks)) return []
  return (json.drinks as CocktailRaw[]).map(toRecipe)
}

export async function searchByName(name: string): Promise<Recipe[]> {
  const res = await fetch(`${BASE}/search.php?s=${encodeURIComponent(name)}`)
  const json = await res.json()
  if (!json.drinks || !Array.isArray(json.drinks)) return []
  return (json.drinks as CocktailRaw[]).map(toRecipe)
}

export async function getRecipeById(id: string): Promise<Recipe | null> {
  const res = await fetch(`${BASE}/lookup.php?i=${id}`)
  const json = await res.json()
  if (!json.drinks) return null
  return toRecipe(json.drinks[0] as CocktailRaw)
}

export async function searchMultipleIngredients(ingredients: string[]): Promise<Recipe[]> {
  if (ingredients.length === 0) return []
  const results = await Promise.all(ingredients.map(searchByIngredient))
  const map = new Map<string, Recipe>()
  results.flat().forEach((r) => map.set(r.id, r))
  return Array.from(map.values())
}
