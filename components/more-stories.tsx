import { useState } from 'react'
import SectionSeparator from './section-separator/light'
import SectionHeader from './section-header'
import PostPreview from './post-preview'

import { PostSummary } from '@interfaces/post'

type Props = {
  posts: PostSummary[]
}

const MoreStories = ({ posts }: Props) => {
  // Number of posts dislplayed on page load
  const [ initialItems, setInitialItems] = useState(6)

  // Number of posts Loaded when click on "Load More" button
  function handleClick() {
    setInitialItems(loadItems => loadItems + 6)
  }

  return (
    <>
    <SectionSeparator />
    <section>
      <SectionHeader title="See the latest" subtitle="written articles." />
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-20 md:gap-y-20 lg:grid-cols-3 lg:gap-x-4 gap-y-20 mb-32">
        {posts.slice(0, initialItems).map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            author={post.author}
            date={post.date}
            tags={post.tags}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </div>
      <div className='grid items-center justify-items-center px-4 mb-32'>
        {initialItems < posts.length &&
          <button className='rounded-full bg-gray-300 hover:bg-light-blue text-white font-bold py-2 px-4 transition-bg-blue duration-200' onClick={handleClick}>
            LOAD MORE POSTS
          </button>
        }
      </div>
    </section>
    </>
  )
}

export default MoreStories
