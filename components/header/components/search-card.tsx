import Link from 'next/link'
import { motion } from 'framer-motion'

import { globalImage } from '@core/utilities/MotionVariants'

import { CoverImage, DateFormatter } from '@Posts/components'

type Props = {
    title: string
    coverImage: string
    slug: string
}

const SearchCard = ({
    title,
    coverImage,
    slug,
}: Props) => {
    return (
        <article className='mb-5'>
            <motion.div
                className="mb-3 global-radius"
                variants={globalImage}
                whileHover="whileHover"
            >
                <CoverImage slug={slug} title={title} src={coverImage} width={'100%'} height={'100%'} />
            </motion.div>
            <h3 className="text-sm font-bold leading-relaxed">
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

export default SearchCard
