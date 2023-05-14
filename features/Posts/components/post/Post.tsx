import { ReactNode } from 'react';

import PostTitle from './post-title/PostTitle'
import PostContent from './post-content/PostContent';
import PostHeader from './post-header/PostHeader';
import PostRelatedArticles from './post-related-articles/PostRelatedArticles';
import { PostSummary } from '@interfaces/post';

type Props = {
  children: ReactNode
  PostTitle: string
  PostContent: string
  PostHeader: string
  PostRelatedArticles: PostSummary[]
}

const Post = ({ children }: Props) => {
  return (
    <div>
      {children}
    </div>
  );
};

export default Post;

Post.Title = PostTitle
Post.Header = PostHeader
Post.Content = PostContent
Post.RelatedArticles = PostRelatedArticles