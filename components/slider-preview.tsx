import Link from 'next/link'
import { motion } from 'framer-motion'

import { CoverImage, AvatarImage, PostTag } from '@Posts/components'

import { globalImage } from '@core/utilities/MotionVariants'
import 'keen-slider/keen-slider.min.css'

type Props = {
  title: string
  coverImage: string
  excerpt: string
  tags: string[]
  slug: string
  author: any
}

const SliderPreview = ({
  title,
  coverImage,
  excerpt,
  tags,
  slug,
  author,
}: Props) => {
  return (
    <article className="keen-slider__slide">
      <motion.div
        className="mt-5 mb-5 global-radius"
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
      <div className='pr-6'>
        <div className="grid grid-cols-1 mb-4">
          <PostTag tags={tags} />
        </div>
        <h3 className="text-xl mb-3 font-semibold leading-tight lg:text-2xl lg:font-bold lg:leading-relaxed">
          <Link
            href={`${process.env.NEXT_PUBLIC_URL}/blog/${slug}`}
            className="hover:underline"
          >
            {title}
          </Link>
        </h3>
        <p className="text-base font-light leading-relaxed mb-4 lg:text-lg lg:font-medium">
          {excerpt}
        </p>
      </div>
    </article>
  )
}

export default SliderPreview
