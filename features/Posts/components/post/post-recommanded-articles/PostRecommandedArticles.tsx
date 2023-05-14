import type { PostSummary } from '@interfaces/post'

import SectionSeparator from '@components/section-separator/light'
import FeaturedSubtitle from '@components/featured-subtitle'
import { PostCard } from '@Posts/components'

type Props = {
    posts: PostSummary[]
}

const RecommandedArticles = ({ posts }: Props) => {
    const recommanded = posts.filter(rPost => rPost.recommanded === true)

    return (
        <section>
            <SectionSeparator />
            <div className='global-featured-title'>
                <FeaturedSubtitle title="Recommanded" subtitle="articles to read" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-32">
                {recommanded.map((post) => (
                    <div key={post.slug}>
                        <PostCard
                            key={post.slug}
                            title={post.title}
                            coverImage={post.coverImage}
                            author={post.author}
                            slug={post.slug}
                        />
                    </div>
                ))}
            </div>
        </section>
    )
}

export default RecommandedArticles
