import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

import { lowercaseArrayOfStrings } from 'core'
import { PostType } from '@interfaces/post'
import { readingTime } from './reading-time'

type Items = {
  [key: string]: string | string[]
}

const postsDirectory = join(process.cwd(), '_posts')
const authorsDirectory = join(process.cwd(), '_authors')
const tagsDirectory = join(process.cwd(), '_tags')

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const items: Items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }

    if (field === 'content') {
      items[field] = content
    }

    if (field === 'readingTime') {
      items[field] = `${readingTime(content)} minutes read`
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field]
    }
  })

  return items
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  return posts
}

export function getPostsByTag(tag: string, fields: string[] = []) {
  return getAllPosts(fields).filter((post) => {
    const { tags } = post as unknown as PostType
    return tags && lowercaseArrayOfStrings(tags).includes(tag)
  })
}

export function getAllTags() {
  const filenames = fs.readdirSync(tagsDirectory)

  return filenames.map(filename => {
    const file = fs.readFileSync(join(tagsDirectory, filename), 'utf8')
    const data = JSON.parse(file)
    const slug = filename.replace(/\.json/, '')

    return {
      ...data,
      slug,
      permalink: `${slug}`,
      pictureUrl: `${slug}.jpg`,
    }
  })
}

export function getTagBySlug(slug: string | string[]) {
  // get slug from filename
  const path = join(tagsDirectory, `${slug}.json`)
  const file = fs.readFileSync(path, 'utf8')
  const data = JSON.parse(file)

  return {
    ...data,
    slug,
    permalink: `${slug}`,
    pictureUrl: `${slug}.jpg`,
  }
}

export function getAllAuthors() {
  const filenames = fs.readdirSync(authorsDirectory)

  return filenames.map(filename => {
    const file = fs.readFileSync(join(authorsDirectory, filename), 'utf8')
    const data = JSON.parse(file)
    const slug = filename.replace(/\.json/, '')

    return {
      ...data,
      slug,
      permalink: `${slug}`,
      profilePictureUrl: `${slug}.jpg`,
    }
  })
}

export function getAuthorBySlug(slug: string | string[]) {
  // get slug from filename
  const path = join(authorsDirectory, `${slug}.json`)
  const file = fs.readFileSync(path, 'utf8')
  const data = JSON.parse(file)

  return {
    ...data,
    slug,
    permalink: `${slug}`,
    profilePictureUrl: `${slug}.jpg`,
  }
}

/** Search bar */
export function getSearchPosts() {
  const fileNames = fs.readdirSync(postsDirectory)

  const allPostsData = fileNames.map(fileName => {
    const slug = fileName.replace(/\.md$/, '')
    const fullPath = join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)

    return {
      slug,
      ...matterResult.data
    }
  })

  return allPostsData
}

/** Used for pagination */
export function getNextPost(slug: string) {
  const allPosts = getAllPosts(['title', 'slug', 'date', 'coverImage'])

  const index = allPosts.map((post) => post.slug).indexOf(slug)

  if (index === allPosts.length - 1 || index === -1) return null

  return allPosts[index + 1]
}

export function getPreviousPost(slug: string) {
  const allPosts = getAllPosts(['title', 'slug', 'date', 'coverImage'])

  const index = allPosts.map((post) => post.slug).indexOf(slug)

  if (index === 0 || index === -1) return null

  return allPosts[index - 1]
}
