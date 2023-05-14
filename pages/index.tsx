import Head from 'next/head'

import { getAllPosts, getAuthorBySlug, getTagBySlug } from '@core/helpers/api'
import { SITE_NAME, SITE_DESCRIPTION } from '@core/constants'
import { POST_HEADER_FIELDS } from '@features/Posts'
import { PostSummary } from '@interfaces/post'

import Layout from 'components/layout'
import Container from 'components/container'
import HeroHome from '@components/hero-home'
import HeroHeader from '@components/hero-header'
import Subscribe from '@components/subscribe'
import Intro from '@components/intro'
import HeroPost from '@components/hero-post'
import MoreStories from '@components/more-stories'
import RecommandedArticles from '@features/Posts/components/post/post-recommanded-articles/PostRecommandedArticles'

type Props = {
  allPosts: PostSummary[]
}

export default function Index({ allPosts }: Props) {
  const heroPost = allPosts[0] // Set to 0 to see the latest post
  const morePosts = allPosts.slice(0) // Let number 0 to see all posts by the load more button in more-stories.tsx file

  return (
    <>
      <Layout>
        <Head>
          <title>{`${SITE_NAME} - ${SITE_DESCRIPTION}`}</title>
        </Head>
        <HeroHeader posts={allPosts}/>
        <Container>
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
          <RecommandedArticles posts={allPosts} />
        </Container>
        <Subscribe />
      </Layout>
    </>
  )
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts(POST_HEADER_FIELDS)

  return {
    props: {
      allPosts: allPosts.map(allPost => ({
        ...allPost,
        author: getAuthorBySlug(allPost.author),
      })),
    },
  }
}
