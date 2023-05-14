import Link from 'next/link'
import { motion } from 'framer-motion'

import { AvatarImage, CoverImage, DateFormatter, PostTag } from '@Posts/components'

import { globalImage } from '@core/utilities/MotionVariants'

type Props = {
  title: string
  coverImage: string
  date: string
  excerpt: string
  tags: string[]
  author: any
  slug: string
}

const PostsListItem = ({
  title,
  coverImage,
  date,
  excerpt,
  tags,
  author,
  slug,
}: Props) => {
  return (
    <article className='mb-5'>
      <motion.div
        className='relative w-full mb-4 aspect-auto global-radius'
        variants={globalImage}
        whileHover='whileHover'
      >
        <CoverImage slug={slug} title={title} src={coverImage} width={'100%'} height={'100%'} />
        <div className='global-item-authors'>
          <div className='item-author'>
            <Link href={{ pathname: `${process.env.NEXT_PUBLIC_URL}/authors/${author.permalink}` }}>
              <AvatarImage name={author.name} src={author.profilePictureUrl} maxWidth='56px' maxHeight='56px' className='rounded-[100px] object-cover' />
            </Link>
          </div>
        </div>
      </motion.div>
      <div className='pr-6'>
        <div className='grid grid-cols-2 mb-4'>
          <PostTag tags={tags} />
          <div className='text-right text-sm'>
            <DateFormatter dateString={date} />
          </div>
        </div>
        <Link
          href={`${process.env.NEXT_PUBLIC_URL}/blog/${slug}`}
          className='hover:underline'
        >
          <h3 className='text-xl font-bold leading-snug lg:text-2xl'>
            {title}
          </h3>
        </Link>

        <p className='text-base font-medium leading-relaxed mb-4 lg:text-lg'>{excerpt}</p>
      </div>
    </article>
  );
};

export default PostsListItem;
