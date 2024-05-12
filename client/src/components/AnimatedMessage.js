import React, { useState, useEffect } from 'react'

const AnimatedMessage = ({ message }) => {
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false)
        }, 5000)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div
            className={`absolute top-0 right-0 mt-4 mr-4 p-4 bg-green-600 text-white rounded-md transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
            {message}
        </div>
    )
}

export default AnimatedMessage
