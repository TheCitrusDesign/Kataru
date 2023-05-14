import Link from 'next/link'
import cn from 'classnames'
import { CoverImage } from '@Posts/components';

import Styles from '@styles/PostNavigation.module.css'

type Props = {
  previous: {
    title: string
    coverImage: string
    href: string
  } | null
  next: {
    title: string
    coverImage: string
    href: string
  } | null
}

const PostNavigation = ({ previous, next }: Props) => {
  return (
    <aside className='navigation-section'>
      <div className={Styles.navigation_wrap}>
        {previous && (
          <Link href={previous.href} className='pr-0 lg:pr-10'>
            <div className={cn('relative w-[160px] h-[160px] mr-3 pointer-events-auto top-0 transition-all duration-300 custom',
              {'hover:drop-shadow-image hover:top-[-3px]':previous.coverImage})}
            >
              <CoverImage slug='' title={previous.title} src={previous.coverImage} width={''} height={''} />
            </div>
            <div className={Styles.navigation_content}>
              <ul>
                <li><small className='inline-block font-medium leading-none m-[2vh_0_1vh] pr-2'>Previous Post</small></li>
                <li>
                  <h5
                    className={cn('text-lg font-medium leading-normal pointer-events-auto lg:text-2xl lg:font-bold', {
                      'hover:underline': previous.title,
                    })}
                  >
                    {previous.title}
                  </h5>
                </li>
              </ul>
            </div>
          </Link>
        )}
        {next && (
          <Link href={next.href} className='ml-auto pl-0 text-right lg:pl-10'>
            <div className={Styles.navigation_content}>
              <ul>
                <li><small className='inline-block font-medium leading-none m-[2vh_0_1vh] pl-2'>Next Post</small></li>
                <li>
                  <h5
                    className={cn('text-lg font-medium leading-normal pointer-events-auto lg:text-2xl lg:font-bold', {
                      'hover:underline': next.title,
                    })}
                  >
                    {next.title}
                  </h5>
                </li>
              </ul>
            </div>
            <div className={cn('relative w-[160px] h-[160px] ml-3 pointer-events-auto top-0 transition-all duration-300 custom', {'hover:drop-shadow-image hover:top-[-3px]':next.coverImage})}>
              <CoverImage slug='' title={next.title} src={next.coverImage} width={''} height={''} />
            </div>
          </Link>
        )}
      </div>
    </aside>
  );
};

export default PostNavigation