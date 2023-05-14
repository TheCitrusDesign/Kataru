import Head from 'next/head'
import { getAllAuthors, getAllPosts, getAuthorBySlug } from '@core/helpers/api'
import { POST_HEADER_FIELDS } from '@features/Posts'
import { SITE_NAME } from '@core/constants'

import Layout from '@components/layout'
import Container from '@components/container'
import { AvatarImage } from '@features/Posts/components'
import SectionSeparator from '@components/section-separator/light'
import FeaturedSubtitle from '@components/featured-subtitle'
import PostPreview from '@components/post-preview'
import Subscribe from '@components/subscribe'

import Styles from '@styles/Author.module.css'

type Props = {
  author: any
}

const Author = ({ author }: Props) => {
  const title = `${author.name} | ${SITE_NAME}`

  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <section className='my-48'>
        <Container>
          <div className={Styles.hero_wrap}>
            <div className='flex flex-col items-center'>
              <div className='flex flex-col justify-center items-center'>
                <div className={Styles.hero_img_wrap}>
                  <div className={Styles.hero_img_container}>
                    <AvatarImage name={author.name} src={author.profilePictureUrl} maxWidth='100%' maxHeight='100%' className='rounded-[50%] object-cover' />
                  </div>
                  <div className={Styles.hero_img_shadow_wrap}><div className={Styles.hero_img_shadow}></div></div>
                  <div className={`${Styles.hero_img_shadow_wrap} ${Styles.hero_img_shadow_wrap_intro}`}><div className={Styles.hero_img_shadow}></div></div>
                </div>
                <div className={`${Styles.hero_header} flex flex-col justify-center items-center text-center`}>
                  <div className='flex'>
                    <h1 className={Styles.hero_eyebrow}>{author.name}</h1>
                    <div className='post-tablet'>
                      <span>{author.posts.length}</span>
                    </div>
                  </div>
                  <div className={Styles.hero_heading_wrap}>
                    <h2 className={Styles.hero_heading}>{author.description}</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {(author.posts.length > 0) ? (
            <>
              <SectionSeparator />
              <div className='global-featured-title'>
                <FeaturedSubtitle title='Read these' subtitle='latest articles' />
              </div>
              <div className='grid grid-cols-1 gap-4 mb-32 md:grid-cols-2 lg:grid-cols-3'>
                {author.posts.map((post) => (
                  <PostPreview
                    key={post.slug}
                    title={post.title}
                    coverImage={post.coverImage}
                    author={author}
                    date={post.date}
                    tags={post.tags}
                    slug={post.slug}
                    excerpt={post.excerpt}
                  />
                ))}
              </div>
            </>
          ) : null }
        </Container>
      </section>
      <Subscribe />
    </Layout>
  )
}
export default Author

export function getStaticProps({ params }) {
  const allPosts = getAllPosts(POST_HEADER_FIELDS)

  const author = getAuthorBySlug(params.slug)

  return {
    props: {
      author: {
        ...author,
        posts: allPosts.filter(post => post.author === author.slug),
      },
    },
  }
}

export function getStaticPaths() {
  return {
    paths: getAllAuthors().map(author => ({
      params: {
        slug: author.slug,
      }
    })),
    fallback: false,
  }
}