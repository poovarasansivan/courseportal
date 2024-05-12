import React from 'react'
import { Menu } from '@headlessui/react'
import { HiOutlineSearch } from 'react-icons/hi'
import { IoIosMenu } from 'react-icons/io'

export default function Header({ toggleSidebar }) {
    return (
        <div className="bg-white h-16 px-4 flex justify-between items-center border-b border-gray-400">
            <button className="lg:hidden" onClick={toggleSidebar}>
                <IoIosMenu className="text-gray-600 w-6 h-6" />
            </button>
            <div className="relative">
                <HiOutlineSearch
                    fontSize={20}
                    className="text-gray-400 absolute top-1/2 -translate-y-1/2 hidden lg:block left-3"
                />
                <input
                    type="text"
                    placeholder="Search..."
                    className="text-sm focus:outline-none active:outline-none h-10 w-[24rem] border border-gray-300 rounded-sm pl-11 pr-4 hidden lg:block"
                />
            </div>
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="ml-2 inline-flex rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-400">
                        <span className="sr-only">Open user menu</span>
                        <div className="h-10 w-10 rounded-full bg-sky-500 bg-cover bg-no-repeat bg-center">
                            <span className="sr-only">Hugh Jackson</span>
                        </div>
                    </Menu.Button>
                </div>
            </Menu>
        </div>
    )
}
