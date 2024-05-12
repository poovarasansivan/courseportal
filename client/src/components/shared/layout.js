import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import { useState } from 'react'
import ScrollContainer from '../scroll'

export default function Layout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }
    
    return (
        <ScrollContainer> 
            <div className="flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden">
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                <div className="flex-1">
                    <Header toggleSidebar={toggleSidebar} />
                   
                </div>
            </div>
        </ScrollContainer>
    )
}
