import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Dashboard, Availablecourse, Mycourse } from './pages'
import React, { useState } from 'react'
import Header from './components/shared/Header'
import Sidebar from './components/shared/Sidebar'
import Login from "./pages/login";
function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

return (
        <Router>
            <Header toggleSidebar={toggleSidebar} />
            <div className="flex flex-row h-svh overflow-hidden">
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                <div className="flex-grow overflow-y-auto bg-neutral-100">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/Dashboard" element={<Dashboard />} />

                        <Route path="/Availablecourse" element={<Availablecourse />} />
                        <Route path="/Mycourse" element={<Mycourse />} />
                    </Routes>
                </div>
            </div>
        </Router>
    )
}

export default App
