import Link from 'next/link';

type Props = {
  tags: string[]
}

const PostTag = ({ tags }: Props) => {
  return (
    <div className="text-sm global-tags">
      {tags.map(tag => (
        <Link href={`/tag/${tag}`} key={tag}>{tag}</Link>
      ))}
    </div>
  );
};

export default PostTag;
