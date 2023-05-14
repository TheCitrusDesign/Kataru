import Head from 'next/head'
import { getAllTags, getPostsByTag, getAuthorBySlug, getTagBySlug } from 'core/helpers/api'
import { PostsList, POST_HEADER_FIELDS, usePostsListNavigation } from '@features/Posts'
import { PostSummary } from '@interfaces/post'
import { SITE_NAME } from 'core/constants'

import Layout from 'components/layout'
import Container from 'components/container'
import SectionSeparator from '@components/section-separator/light'
import FeaturedSubtitle from '@components/featured-subtitle'
import Subscribe from '@components/subscribe'

import Styles from '@styles/Author.module.css'
import { TagImage } from '@features/Posts/components'

type Props = {
  posts: PostSummary[]
  viewTags: any
}

const TagPage = ({ posts, viewTags }: Props) => {
  const title = `${viewTags.name} | ${SITE_NAME}`;
  const { paginatedPosts, previous, next, previousPage, nextPage } = usePostsListNavigation(posts);

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
                    <TagImage name={viewTags.name} src={viewTags.pictureUrl} slug={viewTags.slug} maxWidth='100%' maxHeight='100%' className='rounded-[50%] object-cover' />
                  </div>
                  <div className={Styles.hero_img_shadow_wrap}><div className={Styles.hero_img_shadow}></div></div>
                  <div className={`${Styles.hero_img_shadow_wrap} ${Styles.hero_img_shadow_wrap_intro}`}><div className={Styles.hero_img_shadow}></div></div>
                </div>
                <div className={`${Styles.hero_header} flex flex-col justify-center items-center text-center`}>
                  <div className='flex'>
                    <h1 className={Styles.hero_eyebrow}>{viewTags.name}</h1>
                    <div className='post-tablet'>
                      <span>{posts.length}</span>
                    </div>
                  </div>
                  <div className={Styles.hero_heading_wrap}>
                    <h2 className={Styles.hero_heading}>{viewTags.description}</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <SectionSeparator />
          <div className='global-featured-title'>
            <FeaturedSubtitle title='Check out the' subtitle='latest articles' />
          </div>
          <PostsList Item={''} Navigation={''}>
            {paginatedPosts.map((post) => (
              <PostsList.Item
                key={post.slug}
                title={post.title}
                date={post.date}
                author={post.author}
                excerpt={post.excerpt}
                slug={post.slug}
                coverImage={post.coverImage}
                tags={post.tags}
              />
            ))}
            <PostsList.Navigation
              previous={previous}
              next={next}
              previousPage={previousPage}
              nextPage={nextPage}
            />
          </PostsList>
        </Container>
      </section>
      <Subscribe />
    </Layout>
  );
};

export default TagPage;

export async function getStaticProps({ params }) {
  const posts = getPostsByTag(params.slug, POST_HEADER_FIELDS)

  return {
    props: {
      posts: posts.map((post) => ({
        ...post,
        author: getAuthorBySlug(post.author),
      })),
      /** Get informations from the tag.json file */
      viewTags: getTagBySlug(params.slug),
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: getAllTags().map(tag => ({
      params: {
        slug: tag.slug,
      }
    })),
    fallback: false,
  };
}
