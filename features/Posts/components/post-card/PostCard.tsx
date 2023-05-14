import Link from 'next/link'
import { motion } from 'framer-motion'

import { CoverImage, AvatarImage } from '@Posts/components'

import { globalImage } from '@core/utilities/MotionVariants'

type Props = {
    title: string
    slug: string
    coverImage: string
    author: any
}

const PostRelatedCard = ({ title, slug, coverImage, author }: Props) => {
    return (
        <article className='mb-5'>
            <motion.div
                className='w-full mb-4 aspect-auto global-radius'
                variants={globalImage}
                whileHover="whileHover"
            >
                <CoverImage slug={slug} title={title} src={coverImage} width={'100%'} height={'100%'} />
                <div className="global-item-authors">
                    <div className="item-author">
                        <Link href={{ pathname: `${process.env.NEXT_PUBLIC_URL}/authors/${author.permalink}` }}>
                            <AvatarImage name={author.name} src={author.profilePictureUrl} maxWidth="56px" maxHeight="56px" className="rounded-[100px] object-cover" />
                        </Link>
                    </div>
                </div>
            </motion.div>
            <h3 className='text-basic mb-3 font-semibold leading-tight lg:text-lg lg:font-bold lg:leading-relaxed'>
                <Link
                    href={{ pathname: `${process.env.NEXT_PUBLIC_URL}/blog/${slug}` }}
                    className="hover:underline"
                >
                    {title}
                </Link>
            </h3>
        </article>
    )
}

export default PostRelatedCard