export interface Recipe {
  id: string
  title: string
  image: string
  source: 'cocktail' | 'meal'
  category?: string
  instructions?: string
  ingredients?: string[]
}

export interface Favorite {
  id: string
  recipe_id: string
  title: string
  image_url: string
  source: string
  created_at: string
}

export interface PantryItem {
  id: string
  ingredient: string
  created_at: string
}

export interface User {
  id: string
  email?: string
}
