import Link from 'next/link'
import Image from 'next/image'

type Props = {
  title: string
  src: string
  slug?: string
  width: string
  height: string
}

const CoverImage = ({ title, src, slug, width, height }: Props) => {
  const image = (
    <Image
      src={src}
      alt={`Cover Image for ${title}`}
      className='global-image-orientation global-radius'
      width={400}
      height={100}
      style={{width:width, height:height}}
      loading="lazy"
    />
  )
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={{pathname: `${process.env.NEXT_PUBLIC_URL}/blog/${slug}`}} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  )
}

export default CoverImage
