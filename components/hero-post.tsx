import Link from 'next/link'
import { AvatarImage, CoverImage, DateFormatter, PostTag } from '@Posts/components'

type Props = {
  title: string
  excerpt: string
  coverImage: string
  author: any
  date: string
  tags: string[]
  slug: string
}

const HeroPost = ({
  title,
  excerpt,
  coverImage,
  author,
  date,
  tags,
  slug,
}: Props) => {
  return (
    <section>
      <div className="mb-8 md:mb-16 global-image-post">
        <CoverImage title={title} src={coverImage} slug={slug} width={'100%'} height={'100%'} />
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <div className="grid grid-cols-2">
            <div className="global-tags mb-4">
              <PostTag tags={tags} />
            </div>
            <div className="text-right text-lg mb-4">
              <DateFormatter dateString={date} />
            </div>
          </div>
          <h3 className="mb-4 text-4xl lg:text-5xl leading-tight">
            <Link
              href={{pathname: `${process.env.NEXT_PUBLIC_URL}/blog/${slug}`}}
              className="hover:underline"
            >
              {title}
            </Link>
          </h3>
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
          <Link href={{pathname: `${process.env.NEXT_PUBLIC_URL}/authors/${author.permalink}`}}>
            <AvatarImage name={author.name} src={author.profilePictureUrl} maxWidth="56px" maxHeight="56px" className="rounded-[500px] object-cover" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default HeroPost
