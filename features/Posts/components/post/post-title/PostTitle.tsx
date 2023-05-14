import { ReactNode } from 'react'

import Styles from '@styles/SinglePost.module.css'

type Props = {
  children?: ReactNode
}

const PostTitle = ({ children }: Props) => {
  return (
    <h1 className={Styles.post_title}>
      {children}
    </h1>
  )
}

export default PostTitle
