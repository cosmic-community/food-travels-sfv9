# Food Travels

![App Preview](https://imgix.cosmicjs.com/c87ad6c0-b6b7-11f1-8468-0b494015961a-autopilot-photo-1414235077428-338989a2e8c0-1790103588298.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A warm, appetizing food travel blog built with Next.js and Cosmic. Explore culinary adventures by destination, category, author, and craving-specific tags.

## Features

- 🏠 Hero homepage with featured image + latest posts
- 📝 Posts listing with tag filtering
- 📍 Individual post pages with featured image, destination, tags, rich content, author card, and category
- 🗂️ Category pages listing posts per category
- ✍️ Author pages with bio, photo, home base, and their posts
- 🏷️ Browse-by-tag pages (Street Food, Local Cuisine, Budget Eats, Fine Dining, Desserts, Markets, Vegetarian)
- 📱 Fully responsive, image-forward design

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=6ab2cfeb88b74b21978e8336&clone_repository=6ab2d25888b74b21978e836f)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> Create content models for a blog with posts (including featured images, content, and tags), authors, and categories.
>
> User instructions: A food travel blog with posts, authors, and categories

### Code Generation Prompt

> Build a Next.js application for a creative portfolio called "Food Travels". The content is managed in Cosmic CMS with the following object types: authors, categories, posts. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> User instructions: A food travel blog showcasing culinary adventures around the world. Pages: a home page with a hero and featured/latest posts grid; a posts listing page; individual post pages showing featured image, title, destination, tags, rich-text content, author card, and category; category pages listing posts per category; author pages with bio, profile photo, home base, and their posts. Filter or browse by tags (Street Food, Local Cuisine, Budget Eats, Fine Dining, Desserts, Markets, Vegetarian). Warm, appetizing, image-forward design that's responsive and fast.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) (App Router)
- [Cosmic](https://www.cosmicjs.com) headless CMS
- TypeScript
- Tailwind CSS

## Getting Started

### Prerequisites
- [Bun](https://bun.sh/) installed
- A Cosmic bucket with `authors`, `categories`, and `posts` object types

### Installation

```bash
bun install
bun run dev
```

Visit `http://localhost:3000`.

### Environment Variables

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

## Cosmic SDK Examples

```typescript
// Fetch posts with connected author and category
const { objects } = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

```typescript
// Fetch posts by author id
const { objects } = await cosmic.objects
  .find({ type: 'posts', 'metadata.author': authorId })
  .depth(1)
```

## Cosmic CMS Integration

This app reads from three Cosmic object types:
- **authors**: name, bio, profile_photo, home_base
- **categories**: name, description
- **posts**: title, excerpt, content, featured_image, destination, tags, author, category

Learn more about querying content in the [Cosmic docs](https://www.cosmicjs.com/docs).

## Deployment Options

### Vercel
1. Push to GitHub
2. Import into [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

### Netlify
1. Push to GitHub
2. Import into [Netlify](https://netlify.com)
3. Set build command `bun run build` and publish directory `.next`
4. Add environment variables
5. Deploy

Set `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, and `COSMIC_WRITE_KEY` in your hosting provider's environment variable settings.
<!-- README_END -->