import Link from 'next/link'
import Image from 'next/image'

type Props = {
    name: string
    src: string
    slug?: string
    maxWidth?: string
    maxHeight?: string
    className?: string
}

const AvatarImage = ({ name, src, slug, className, maxWidth, maxHeight }: Props) => {
    const image = (
        <Image
            src={`/assets/blog/authors/${src}`}
            alt={`${name} post author`}
            className={className}
            width={640}
            height={640}
            style={{
                maxWidth: maxWidth,
                maxHeight: maxHeight,
                marginRight: "1rem"
            }}
            loading="lazy"
        />
    )
    return (
        <div className="sm:mx-0">
            {slug ? (
                <Link href={{pathname: `${process.env.NEXT_PUBLIC_URL}/authors/${slug}`}}>
                    {image}
                </Link>
            ) : (
                image
            )}
        </div>
    )
}

export default AvatarImage
