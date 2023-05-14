import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'

import { SITE_NAME } from '@core/constants'
import { getAllPosts, getAllAuthors, getAuthorBySlug } from '@core/helpers/api'
import { POST_HEADER_FIELDS } from '@features/Posts'
import { PostSummary } from '@features/Posts/interfaces/post'
import { AvatarImage } from '@Posts/components'

import Layout from 'components/layout'
import Container from 'components/container'
import SectionHeader from 'components/section-header'
import { RecommandedArticles } from '@Posts/components'
import Subscribe from '@components/subscribe'

import { globalImage } from '@core/utilities/MotionVariants'

type Props = {
  allPosts: PostSummary[]
  viewAuthors: string[]
}

const Authors = ({ allPosts, viewAuthors }: Props) => {
  const title = `Authors | ${SITE_NAME}`

  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <section className='my-48'>
        <Container>
          <div className='lg:mb-48'>
            <SectionHeader title="See the list of" subtitle="all authors" />
          </div>
          <div className='grid grid-cols-2 gap-4 mb-32 md:grid-cols-3 lg:grid-cols-6'>
            {viewAuthors.map((author: any) => (
              <div className='mb-6' key={author.slug}>
                <motion.div
                  key={author.slug}
                  className="mb-3 global-radius"
                  variants={globalImage}
                  whileHover="whileHover"
                >
                  <AvatarImage name={author.name} src={author.profilePictureUrl} slug={author.slug} maxWidth="320px" maxHeight="380px" className="rounded-[26px] object-cover" />
                </motion.div>
                <Link
                  href={{ pathname: `${process.env.NEXT_PUBLIC_URL}/authors/${author.permalink}` }}
                  className="hover:underline"
                >
                  <h2 className='text-xl font-bold lg:text-2xl'>{author.name}</h2>
                </Link>
                {author.posts.length > 1 ? (
                  <p className='font-semibold mb-3'>{author.posts.length} posts</p>
                ) : (
                  <p className='font-semibold mb-3'>{author.posts.length} post</p>
                )}
                <p>{author.description}</p>
              </div>
            ))}
          </div>
          <RecommandedArticles posts={allPosts} />
        </Container>
        <Subscribe />
      </section>
    </Layout>
  )
}

export default Authors

export async function getStaticProps() {
  const allPosts = getAllPosts(POST_HEADER_FIELDS)

  return {
    props: {
      allPosts: allPosts.map(allPost => ({
        ...allPost,
        author: getAuthorBySlug(allPost.author)
      })),
      viewAuthors: getAllAuthors().map(author => ({
        ...author,
        posts: allPosts.filter(post => post.author === author.slug),
      })),
    },
  }
}
