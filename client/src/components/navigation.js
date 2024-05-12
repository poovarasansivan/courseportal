import { AiOutlineHome } from 'react-icons/ai'
import { SiCoursera } from 'react-icons/si'

import { HiOutlineQuestionMarkCircle, HiOutlineCog } from 'react-icons/hi'

export const DASHBOARD_SIDEBAR_LINKS = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        path: '/Dashboard',
        icon: <AiOutlineHome />
    },

    {
        key: 'courses',
        label: 'Available course ',
        path: '/Availablecourse',
        icon: <SiCoursera />
    },
    {
        key: 'courses',
        label: 'My course ',
        path: '/Mycourse',
        icon: <SiCoursera />
    }
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
    {
        key: 'settings',
        label: 'Settings',
        icon: <HiOutlineCog />
    },
    {
        key: 'support',
        label: 'Help & Support',
        icon: <HiOutlineQuestionMarkCircle />
    }
]
