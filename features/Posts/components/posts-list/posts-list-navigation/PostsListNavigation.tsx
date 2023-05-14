type Props = {
  previous: boolean;
  next: boolean;
  previousPage: () => void;
  nextPage: () => void;
}

const PostsListNavigation = ({
  previous,
  next,
  previousPage,
  nextPage,
}: Props) => {
  return (
    <div className='flex'>
      {previous && (
        <button
          onClick={previousPage}
        >
            Newer Posts
        </button>
      )}
      {next && (
        <button
          onClick={nextPage}
        >
            Older posts
        </button>
      )}
    </div>
  );
};

export default PostsListNavigation;
