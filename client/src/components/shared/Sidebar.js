import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { IoIosLogOut } from 'react-icons/io';
import { DASHBOARD_SIDEBAR_BOTTOM_LINKS, DASHBOARD_SIDEBAR_LINKS } from '../navigation';

const linkClasses =
    'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base';

export default function Sidebar({ isOpen, toggleSidebar }) {
    const { pathname } = useLocation();
    const isMobile = window.innerWidth <= 786; // Define isMobile based on screen width

    useEffect(() => {
        if (!isMobile && !isOpen) {
            toggleSidebar(true); // Open sidebar by default on larger screens if it's not already open
        }
    }, [isMobile, isOpen, toggleSidebar]);

    return (
        <>
            <div className={classNames('bg-neutral-900 w-60 p-3 flex flex-col text-white', { hidden: !isOpen })} style={{ width: '250px' }}>
                <div className="flex items-center justify-between px-1 py-3">
                    <span className="text-neutral-100 text-lg">Course Dashboard</span>
                </div>

                <div className={classNames('lg:flex lg:flex-col lg:gap-0.5 lg:pt-2', { hidden: !isOpen })}>
                    {DASHBOARD_SIDEBAR_LINKS.map((item) => (
                        <SidebarLink key={item.key} item={item} pathname={pathname} />
                    ))}
                    <hr className='mt-72 mb-2'></hr>
                    {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
                        <SidebarLink key={item.key} item={item} pathname={pathname} />
                    ))}
                    {isMobile ? (
                        <div
                            className={classNames('text-red-500 cursor-pointer lg:hidden', linkClasses)}
                            onClick={toggleSidebar} // Use toggleSidebar instead of undefined toggleMenu
                        >
                            <span className="text-xl">
                                <IoIosLogOut />
                            </span>
                            Log out
                        </div>
                    ) : null}
                </div>
            </div>
        </>
    );
}

function SidebarLink({ item, pathname }) {
    return (
        <Link
            to={item.path}
            className={classNames(
                pathname === item.path ? 'bg-neutral-700 text-white' : 'text-neutral-400',
                linkClasses
            )}
            style={{ marginBottom: '0.5rem' }}
        >
            <span className="text-xl">{item.icon}</span>
            {item.label}
        </Link>
    );
}
