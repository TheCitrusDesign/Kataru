import Link from 'next/link'
import { Disclosure, Transition } from "@headlessui/react"
import { useCallback, useRef, useState } from 'react'

import { motion } from 'framer-motion'

import { modalSearch } from '@core/utilities/MotionVariants'

import Modal from "@components/common/modal/modal-search"


import Styles from '@styles/Header.module.css'
import Container from '@components/container'
import SectionSeparator from '@components/section-separator/light'
import SearchCard from './search-card'

const Sidebar = ({ openSidebar = false, setOpenSidebar }) => {
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
    <>
      <Transition show={openSidebar}>
        {/* Sliding sidebar */}
        <Transition.Child
          className="fixed right-0 top-0 w-[100%] z-30 h-screen"
          enter="transition ease-in-out duration-300 transform"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <div
            id="sidebar"
            className={`fixed right-0 top-0 w-[100%] h-screen bg-almost-white pt-20 p-8 z-50`}
          >
            <button
              onClick={() => setOpenSidebar(false)}
              aria-expanded={openSidebar}
              aria-controls="sidebar"
            >
              <img
                className="absolute top-6 right-5 w-8 h-8"
                src={`${process.env.NEXT_PUBLIC_URL}/assets/navmenu/icon-close-menu.svg`}
                alt="Close Menu"
              />
            </button>
            <ul className="flex flex-col space-y-3">
              <li><Link href={{ pathname: `${process.env.NEXT_PUBLIC_URL}` }}>Demos</Link></li>
              <li><Link href={{ pathname: `${process.env.NEXT_PUBLIC_URL}` }}>Style Guide</Link></li>
              <li><Link href={{ pathname: `${process.env.NEXT_PUBLIC_URL}` }}>Membership</Link></li>
              <li>
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex items-center text-left">
                        <span className="mr-4">Other Options</span>
                        <img
                          className="w-7 h-4"
                          src={`${process.env.NEXT_PUBLIC_URL}/assets/navmenu/icon-arrow-${open ? "up" : "down"}.svg`}
                          alt="Arrow"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                        <ul className="flex flex-col space-y-3">
                          <li>
                            <Link
                              href={{ pathname: `${process.env.NEXT_PUBLIC_URL}` }}
                              className={``}
                            >Features</Link>
                          </li>
                          <li>
                            <Link
                              href={{ pathname: `${process.env.NEXT_PUBLIC_URL}/tag` }}
                              className={``}
                            >Tags</Link>
                          </li>
                          <li>
                            <Link
                              href={{ pathname: `${process.env.NEXT_PUBLIC_URL}/authors` }}
                              className={``}
                            >Authors</Link>
                          </li>
                          <li>
                            <Link
                              href={{ pathname: `${process.env.NEXT_PUBLIC_URL}/subscribe` }}
                              className={``}
                            >Sunscribe</Link>
                          </li>
                          <li>
                            <Link
                              href={{ pathname: `${process.env.NEXT_PUBLIC_URL}/contact` }}
                              className={``}
                            >Contact</Link>
                          </li>
                          <li>
                            <Link
                              href={{ pathname: `${process.env.NEXT_PUBLIC_URL}` }}
                              className={``}
                            >Get Theme</Link>
                          </li>
                        </ul>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </li>
            </ul>

            <div className="flex flex-col space-y-5 items-center justify-items-center pt-8">
              <div className={`${Styles.is_mobile} global-button`} onClick={() => setOpenModal(true)}>
                <span className='flex'>
                  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="m16.822 18.813 4.798 4.799c.262.248.61.388.972.388.772-.001 1.407-.637 1.407-1.409 0-.361-.139-.709-.387-.971l-4.799-4.797c3.132-4.108 2.822-10.005-.928-13.756l-.007-.007-.278-.278a.6985.6985 0 0 0-.13-.107C13.36-1.017 7.021-.888 3.066 3.067c-4.088 4.089-4.088 10.729 0 14.816 3.752 3.752 9.65 4.063 13.756.93Zm-.965-13.719c2.95 2.953 2.95 7.81 0 10.763-2.953 2.949-7.809 2.949-10.762 0-2.951-2.953-2.951-7.81 0-10.763 2.953-2.95 7.809-2.95 10.762 0Z"></path>
                  </svg>
                  Search
                </span>
              </div>
              <div className="signup">
                <button>
                <Link href={{ pathname: `${process.env.NEXT_PUBLIC_URL}/contact` }} className="signup global-button">Join</Link>
                </button>
              </div>
            </div>
          </div>
          {/* ... */}
        </Transition.Child>
        <Transition.Child
          enter="transition-opacity ease-linear duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {/* ... */}
          <div
            onClick={() => setOpenSidebar(false)}
            className={`"w-full h-full fixed bg-ghost-white opacity-100 z-10 inset-0`}
          ></div>
        </Transition.Child>
      </Transition>
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
                <div className="grid grid-cols-3 gap-4 mt-10 mb-32 md:grid-cols-2 lg:grid-cols-8">
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

    </>
  );
};

export default Sidebar;