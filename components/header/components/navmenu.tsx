import { Menu, Transition } from '@headlessui/react'
import Link from 'next/link'

const NavMenu = () => {
    return (
        <nav>
            <ul>
                <li><Link href={{pathname: `${process.env.NEXT_PUBLIC_URL}`}}>Demos</Link></li>
                <li><Link href={{pathname: `${process.env.NEXT_PUBLIC_URL}`}}>Style Guide</Link></li>
                <li><Link href={{pathname: `${process.env.NEXT_PUBLIC_URL}`}}>Membership</Link></li>
                <li>
                    <Menu>
                        <Menu.Button className="hover:text-almost-black mr-6">
                            <span>
                                <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                                    <path d="m11.974 18.908.019.002.025.001c.085 0 .166-.034.226-.094L23.906 7.155A.32.32 0 0 0 24 6.928c0-.085-.034-.166-.094-.227l-1.519-1.518a.3217.3217 0 0 0-.454 0l-9.94 9.94-9.927-9.926a.3218.3218 0 0 0-.227-.094c-.085 0-.167.034-.227.094L.094 6.716a.3217.3217 0 0 0 0 .454l11.647 11.647c.06.06.142.094.227.094l.006-.003Z"></path>
                                </svg>
                            </span>
                        </Menu.Button>
                        <Transition
                            enter="transition duration-100 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition duration-75 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                        >
                            <Menu.Items className="absolute right-0 mt-4 w-[10rem] py-3 rounded-[18px] shadow-lg bg-zinc-800 text-ghost-white ring-1 ring-black ring-opacity-5 focus:outline-none ">
                                <Menu.Item>
                                    {({ active }) => (
                                        <Link
                                            href={{ pathname: `${process.env.NEXT_PUBLIC_URL}` }}
                                            className={`${active && "text-light-blue underline"
                                                } block w-full text-left px-4 py-2 text-sm cursor-pointer`}
                                        >Features</Link>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <Link
                                            href={{ pathname: `${process.env.NEXT_PUBLIC_URL}/tag` }}
                                            className={`${active && "text-light-blue underline"
                                                } block w-full text-left px-4 py-2 text-sm cursor-pointer`}
                                        >Tags</Link>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <Link
                                            href={{ pathname: `${process.env.NEXT_PUBLIC_URL}/authors` }}
                                            className={`${active && "text-light-blue underline"
                                                } block w-full text-left px-4 py-2 text-sm cursor-pointer`}
                                        >Authors</Link>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <Link
                                            href={{ pathname: `${process.env.NEXT_PUBLIC_URL}/subscribe` }}
                                            className={`${active && "text-light-blue underline"
                                                } block w-full text-left px-4 py-2 text-sm cursor-pointer`}
                                        >Subscribe</Link>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <Link
                                            href={{ pathname: `${process.env.NEXT_PUBLIC_URL}/contact` }}
                                            className={`${active && "text-light-blue underline"
                                                } block w-full text-left px-4 py-2 text-sm cursor-pointer`}
                                        >Contact</Link>
                                    )}
                                </Menu.Item>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </li>
            </ul>
        </nav>
    );
};

export default NavMenu;