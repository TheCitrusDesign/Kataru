import { ReactNode } from 'react';

import PostsListItem from './posts-list-item/PostsListItem';
import PostsListNavigation from './posts-list-navigation/PostsListNavigation';

type Props = {
  Item: string
  Navigation: string
  children: ReactNode
}

const PostsList = ({ children }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-20 md:gap-y-20 lg:grid-cols-3 lg:gap-x-4 gap-y-20 mb-32">
      {children}
    </div>
  );
};

PostsList.Item = PostsListItem;
PostsList.Navigation = PostsListNavigation;

export default PostsList;
