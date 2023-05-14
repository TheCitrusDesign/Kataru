import { useRouter } from 'next/router'
import ErrorPage from 'next/error'

import { getAllPosts, getPostBySlug, getAuthorBySlug, getPostsByTag, getNextPost, getPreviousPost, getTagBySlug, getAllTags } from '@core/helpers/api'
import { Post, POST_ALL_FIELDS, POST_HEADER_FIELDS, POSTS_PER_PAGE } from '@features/Posts'
import { SITE_NAME } from '@core/constants'
import markdownToHtml from '@core/utilities/markdownToHtml'
import type { PostType, PostAnchor, PostSummary } from '@interfaces/post'

import Layout from '@components/layout'
import ScrollProgress from '@components/scroll-progress'
import Container from '@components/container'
import Head from 'next/head'
import Navigation from '@components/post-navigation'
import SectionSeparator from '@components/section-separator/light'
import Subscribe from '@components/subscribe'

type Props = {
    post: PostType
    related: PostSummary[]
    previous: PostAnchor | null
    next: PostAnchor | null
}

const PostPage = ({ post, related, previous, next }: Props) => {
    const router = useRouter()
    const title = `${post.title} | ${SITE_NAME}`
    if (!router.isFallback && !post?.slug) {
        return <ErrorPage statusCode={404} />
    }

    return (
        <Layout>
            <Head>
                <title>{title}</title>
                <meta property="og:image" content={post.ogImage.url} />
            </Head>
            <ScrollProgress />
            <Container>
                {router.isFallback ? (
                    <Post.Title>Loading…</Post.Title>
                ) : (
                    <>
                        <article className="my-48">
                            <Post.Header
                                title={post.title}
                                coverImage={post.coverImage}
                                author={post.author}
                                date={post.date}
                                tags={post.tags}
                                copyrightImage={post.copyrightImage}
                                excerpt={post.excerpt}
                                readingTime={post.readingTime}
                            />
                            <Post.Content content={post.content} />
                        </article>
                        <SectionSeparator />
                        <Navigation
                            previous={previous && { title: previous.title, coverImage: previous.coverImage, href: previous.slug }}
                            next={next && { title: next.title, coverImage: next.coverImage, href: next.slug }}
                        />
                        <SectionSeparator />
                        {related.length > 0 ?
                            (
                                <Post.RelatedArticles relatedArticles={related} />
                            ) : null
                        }
                    </>
                )}
            </Container>
            <Subscribe />
        </Layout>
    )
}
export default PostPage

export async function getStaticProps({ params }) {
    const post = getPostBySlug(params.slug, POST_ALL_FIELDS)

    const author = getAuthorBySlug(post.author)

    const content = await markdownToHtml((post.content as string) || '')

    const previous = getPreviousPost(params.slug)
    const next = getNextPost(params.slug)

    // Store the current tags of post
    const relatedTags = (post.tags as string[]) || []

    // Filter related tags out of current post
    const concatRelated = relatedTags.slice(0, POSTS_PER_PAGE)
        .map((rt) => getPostsByTag(rt, POST_HEADER_FIELDS)
        .filter((aPost) => aPost.tags !== post.tags))
    
    // Concat the result
    const related = concatRelated.concat.apply([], concatRelated)

    return {
        props: {
            post: {
                ...post,
                content,
                author,
            },
            previous,
            next,
            related: related.map((post: { author: string | string[] }) => ({
                ...post,
                author: getAuthorBySlug(post.author),
            })),
        },
    }
}

export async function getStaticPaths() {
    const posts = getAllPosts(['slug'])

    return {
        paths: posts.map((post) => ({
            params: {
                slug: post.slug,
            },
        })),
        fallback: false,
    }
}
