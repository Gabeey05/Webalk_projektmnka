/*
  # What's in my Fridge? App Schema

  1. New Tables
    - `pantry_items`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `ingredient` (text) - ingredient name
      - `created_at` (timestamptz)

    - `favorites`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `recipe_id` (text) - external API recipe/cocktail ID
      - `title` (text) - recipe title
      - `image_url` (text) - recipe image URL
      - `source` (text) - 'cocktail' or 'meal'
      - `created_at` (timestamptz)

  2. Security
    - RLS enabled on both tables
    - Users can only access their own pantry items and favorites
*/

CREATE TABLE IF NOT EXISTS pantry_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  ingredient text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE pantry_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own pantry items"
  ON pantry_items FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own pantry items"
  ON pantry_items FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own pantry items"
  ON pantry_items FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recipe_id text NOT NULL,
  title text NOT NULL,
  image_url text NOT NULL DEFAULT '',
  source text NOT NULL DEFAULT 'cocktail',
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, recipe_id)
);

ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own favorites"
  ON favorites FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own favorites"
  ON favorites FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own favorites"
  ON favorites FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS pantry_items_user_id_idx ON pantry_items(user_id);
CREATE INDEX IF NOT EXISTS favorites_user_id_idx ON favorites(user_id);
