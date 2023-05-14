import { useCallback, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { modalSearch } from '@core/utilities/MotionVariants'

import Modal from "@components/common/modal/modal-search"
import NavMenu from './components/navmenu'
import Sidebar from './components/sidebar'
import SearchCard from './components/search-card'
import Container from 'components/container'
import SectionSeparator from '@components/section-separator/light'

import Styles from '@styles/Header.module.css'

const Header = () => {
  const [openSidebar, setOpenSidebar] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  /** Start Search Posts */
  const searchRef = useRef(null)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(false)
  const [results, setResults] = useState([])

  const searchEndpoint = (query) => `/api/search?q=${query}`

  const onChange = useCallback((event) => {
    const query = event.target.value
    setQuery(query)
    if (query.length) {
      fetch(searchEndpoint(query))
        .then((res) => res.json())
        .then((res) => {
          setResults(res.results)
        })
    } else {
      setResults([])
    }
  }, [])

  const onFocus = useCallback(() => {
    setActive(true)
    window.addEventListener('click', onClick)
  }, [])

  /** Reset the input form when user close search bar */
  const onClick = useCallback((event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setActive(false)
      setQuery('')
      setResults([])
      setOpenModal(false)
      window.removeEventListener('click', onClick)
    }
  }, [])

  return (
    <header className={`${Styles.header_section} mb-5`}>
      <Container>
        <div className={`${Styles.header_wrap}`}>
          <div className={Styles.header_logo}>
            <Link href={{ pathname: `${process.env.NEXT_PUBLIC_URL}` }}>
              <Image
                priority
                src={'/assets/logo.svg'}
                alt='Kataru Blog Logo'
                height={250}
                width={500}
              />
            </Link>
          </div>
          <div className='hidden lg:flex lg:space-x-7 lg:ml-14'>
            <div className={`${Styles.header_nav}`}>
              <NavMenu />
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => setOpenSidebar(true)}
              aria-expanded={openSidebar}
              aria-controls="sidebar"
              aria-label="Open Menu"
            >
              <img
                className="block lg:hidden"
                src={`${process.env.NEXT_PUBLIC_URL}/assets/navmenu/icon-menu.svg`}
                alt="Menu"
              />
            </button>
            <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
            <div className="hidden lg:flex lg:space-x-7 lg:items-center">
              <div className={`${Styles.header_search}`}>
                <div className={`${Styles.is_desktop} global-button`} onClick={() => setOpenModal(true)}>
                  <span className='flex'>
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="m16.822 18.813 4.798 4.799c.262.248.61.388.972.388.772-.001 1.407-.637 1.407-1.409 0-.361-.139-.709-.387-.971l-4.799-4.797c3.132-4.108 2.822-10.005-.928-13.756l-.007-.007-.278-.278a.6985.6985 0 0 0-.13-.107C13.36-1.017 7.021-.888 3.066 3.067c-4.088 4.089-4.088 10.729 0 14.816 3.752 3.752 9.65 4.063 13.756.93Zm-.965-13.719c2.95 2.953 2.95 7.81 0 10.763-2.953 2.949-7.809 2.949-10.762 0-2.951-2.953-2.951-7.81 0-10.763 2.953-2.95 7.809-2.95 10.762 0Z"></path>
                    </svg>Search
                  </span>
                </div>
              </div>
              <div className="signup">
                <Link href={{ pathname: `${process.env.NEXT_PUBLIC_URL}/contact` }} className="global-button">Join</Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Modal
        onClose={() => setOpenModal(false)}
        show={openModal}
      >
        <div className={Styles.search_content} ref={searchRef}>
          <div className={Styles.search_form}>
            <input
              className={Styles.search_input}
              onChange={onChange}
              onFocus={onFocus}
              value={query}
              type="text"
              placeholder="Search"
            />
            <div className={Styles.search_meta}>
              <span className={Styles.search_info}>Please enter title of post.</span>
            </div>
          </div>
          {active && results.length > 0 && (
            <motion.div
              variants={modalSearch}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ type: "spring", bounce: 0, duration: .45 }}
            >
              <Container>
                <span className={`${Styles.search_counter}`}>
                  <span className={Styles.search_counter_results}>{results.length} </span>
                  results for your search
                </span>
                <SectionSeparator />
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-20 md:gap-y-20 lg:grid-cols-8 lg:gap-x-4 gap-y-20 mt-10 mb-32">
                  {results.map((post) => (
                    <SearchCard
                      key={post.slug}
                      title={post.title}
                      coverImage={post.coverImage}
                      slug={post.slug}
                    />
                  ))}
                </div>
              </Container>
            </motion.div>
          )}
        </div>

      </Modal>
    </header >
  );
};

export default Header;
