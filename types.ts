export interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  metadata: Record<string, any>
  type: string
  created_at: string
  modified_at: string
}

export interface CosmicFile {
  url: string
  imgix_url: string
}

export interface Author extends CosmicObject {
  type: 'authors'
  metadata: {
    name?: string
    bio?: string
    profile_photo?: CosmicFile
    home_base?: string
  }
}

export interface Category extends CosmicObject {
  type: 'categories'
  metadata: {
    name?: string
    description?: string
  }
}

export type PostTag =
  | 'Street Food'
  | 'Local Cuisine'
  | 'Budget Eats'
  | 'Fine Dining'
  | 'Desserts'
  | 'Markets'
  | 'Vegetarian'

export interface Post extends CosmicObject {
  type: 'posts'
  metadata: {
    excerpt?: string
    content?: string
    featured_image?: CosmicFile
    destination?: string
    tags?: string[]
    author?: Author
    category?: Category
  }
}

export interface CosmicResponse<T> {
  objects: T[]
  total: number
  limit?: number
  skip?: number
}