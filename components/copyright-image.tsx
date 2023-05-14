import Link from "next/link"

type Props = {
  name: string
  linkName: string
  link: string
}

const CrImage = ({ name, linkName, link }: Props) => {
  return (
    <div className="text-left text-xs font-normal my-2">Photo by {name} / 
      <Link href={{pathname: `${link}`}} className="underline hover:text-light-blue">
        {linkName}
      </Link>
    </div>
  )
}

export default CrImage