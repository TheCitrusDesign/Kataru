import markdownStyles from '@components/markdown-styles.module.css'

type Props = {
  content: string
}

const PostContent = ({ content }: Props) => {
  return (
    <div
      className={markdownStyles['markdown']}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}

export default PostContent
