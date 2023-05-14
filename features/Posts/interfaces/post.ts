import CopyrightImage from './copyright-image'

export type PostType = {
  slug: string
  title: string
  excerpt: string
  coverImage?: string
  date: string
  tags: Array<any>
  author: Array<any>
  copyrightImage: CopyrightImage
  content: string
  readingTime: string
  bestStories: boolean
  recommanded: boolean
  related: PostSummary[];
  ogImage: {
    url: string
  }
}

/** Picking the set properties of title, coverImage and slug from PostType */
export type PostAnchor = Pick<PostType, 'title' | 'coverImage' | 'slug'>

/** Picking the set properties of PostType whithout content*/
export type PostSummary = Omit<PostType, 'content'>
