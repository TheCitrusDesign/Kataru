import { PostSummary } from '@interfaces/post'
import { PostCard } from '@Posts/components'
import FeaturedSubtitle from '@components/featured-subtitle'

import Styles from '@styles/RelatedPost.module.css'

type Props = {
    relatedArticles: PostSummary[]
}

const PostRelatedArticles = ({ relatedArticles }: Props) => {
    return (
        <div className='w-full m-0'>
            <div className='global-featured-title'>
                <FeaturedSubtitle title='You also like' subtitle='this related posts' />
            </div>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-6">
                {relatedArticles.map((related) => (
                    <PostCard
                        key={related.slug}
                        slug={related.slug}
                        title={related.title}
                        coverImage={related.coverImage}
                        author={related.author}
                    />
                ))}
            </div>
        </div>
    );
};

export default PostRelatedArticles;
