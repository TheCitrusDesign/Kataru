import Link from 'next/link'
import { AvatarImage, CoverImage, PostTag, DateFormatter } from '@Posts/components'
import PostTitle from '@Posts/components/post/post-title/PostTitle'
import CrImage from '@components/copyright-image'

import type CopyrightImage from '@interfaces/copyright-image'
import Styles from '@styles/SinglePost.module.css'

type Props = {
  title: string
  coverImage: string
  author: any
  date: string
  tags: string[]
  copyrightImage: CopyrightImage
  excerpt: string
  readingTime: string
}

const PostHeader = ({ title, coverImage, author, date, tags, copyrightImage, excerpt, readingTime }: Props) => {

  return (
    <>
      <div className={Styles.post_header}>
        <div className={Styles.post_header_wrap}>
          <div className={Styles.post_header_container}>
            <div className={Styles.post_header_content}>
              <div className={Styles.post_header_content_wrap}>
                <PostTag tags={tags} />
                <PostTitle>{title}</PostTitle>
                <p className={Styles.post_excerpt}>{excerpt}</p>
                <div className={Styles.post_meta}>
                  <div className={Styles.post_author}>
                    <Link
                      href={{pathname: `${process.env.NEXT_PUBLIC_URL}/authors/${author.permalink}`}}
                    >
                      <AvatarImage name={author.name} src={author.profilePictureUrl} maxWidth="56px" maxHeight="56px" className="rounded-[500px] object-cover" />
                    </Link>
                  </div>
                  <div className={Styles.post_meta_content}>
                    <div>
                      <Link
                        href={{pathname: `${process.env.NEXT_PUBLIC_URL}/authors/${author.permalink}`}}
                        className="hover:underline"
                      >
                        {author.name}
                      </Link>
                    </div>
                    <DateFormatter dateString={date} /> - {readingTime}
                  </div>
                </div>
              </div>
            </div>
            <div className={Styles.post_header_image}>
              <figure>
                <div className={Styles.post_image}>
                  <CoverImage title={title} src={coverImage} width='470px' height='auto'/>
                </div>
                <figcaption>
                  <CrImage name={copyrightImage.name} linkName={copyrightImage.linkName} link={copyrightImage.link} />
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PostHeader
