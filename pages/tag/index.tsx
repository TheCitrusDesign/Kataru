import Head from 'next/head'
import Link from 'next/link';
import { motion } from 'framer-motion'

import { SITE_NAME } from '@core/constants'
import { getAllPosts, getTagBySlug, getAuthorBySlug, getAllTags, getPostsByTag, getPostBySlug } from '@core/helpers/api'
import { POST_HEADER_FIELDS } from '@features/Posts'
import { PostSummary } from '@interfaces/post'

import Layout from 'components/layout'
import Container from 'components/container'
import SectionHeader from 'components/section-header'
import { TagImage } from '@Posts/components'
import { RecommandedArticles } from '@Posts/components'
import Subscribe from '@components/subscribe'

import { globalImage } from '@core/utilities/MotionVariants'

type Props = {
    allPosts: PostSummary[]
    viewTags: string[]
}

const Tags = ({ allPosts, viewTags }: Props) => {
    const title = `Tags | ${SITE_NAME}`;

    return (
        <Layout>
            <Head>
                <title>{title}</title>
            </Head>
            <section className='my-48'>
                <Container>
                    <div className='lg:mb-48'>
                        <SectionHeader title="See the list of" subtitle="all tags" />
                    </div>
                    <div className='grid grid-cols-2 gap-4 mb-32 md:grid-cols-3 lg:grid-cols-6'>
                        {viewTags.map((tags: any) => (
                            <div className='mb-6' key={tags.slug}>
                                <motion.div
                                    key={tags.slug}
                                    className="mb-3 global-radius"
                                    variants={globalImage}
                                    whileHover="whileHover"
                                >
                                    <TagImage name={tags.name} src={tags.pictureUrl} slug={tags.slug} maxWidth="100%" maxHeight="100%" className="rounded-[26px] object-cover" />
                                </motion.div>
                                <Link
                                    href={{ pathname: `${process.env.NEXT_PUBLIC_URL}/tag/${tags.permalink}` }}
                                    className="hover:underline"
                                >
                                    <h2 className='text-xl font-bold lg:text-2xl'>{tags.name}</h2>
                                </Link>
                                {tags.posts.length > 1 ? (
                                    <p className='font-semibold mb-3'>{tags.posts.length} posts</p>
                                ) : (
                                    <p className='font-semibold mb-3'>{tags.posts.length} post</p>
                                )}
                                <p>{tags.description}</p>
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
export default Tags

export async function getStaticProps() {
    const allPosts = getAllPosts(POST_HEADER_FIELDS)

    return {
        props: {
            allPosts: allPosts.map(allPost => ({
                ...allPost,
                author: getAuthorBySlug(allPost.author),
            })),
            viewTags: getAllTags().map(tag => ({
                ...tag,
                //posts: allPosts.filter((post) => post.tags === tag.slug),
                //posts: getPostsByTag(tag.slug).filter((post) => post.tags === tag.slug)
                posts: allPosts.filter(post => post.tags === tag.slug),
            })),
        },
    }
}
