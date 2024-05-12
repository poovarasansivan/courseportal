import React, { useState, useEffect } from 'react'
import Icon from '../assets/icon.png'
import AnimatedMessage from '../components/AnimatedMessage'

export default function MyCourse() {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCourse, setSelectedCourse] = useState(null)
    const [sampleCourses, setSampleCourses] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [enrollmentSuccess, setEnrollmentSuccess] = useState(false)

    useEffect(() => {
        fetchAvailableCourseData()
    }, [])

    async function fetchAvailableCourseData() {
        setIsLoading(true)
        try {
            const id = sessionStorage.getItem('EnrolledcoursId')
            const response = await fetch(`http://localhost:5555/getcoursedetails/${id}`)
            if (!response.ok) {
                throw new Error('Failed to fetch course data')
            }
            const data = await response.json()
            setSampleCourses([data])
        } catch (error) {
            setError(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    const openModal = (course) => {
        setSelectedCourse(course)
    }

    const closeModal = () => {
        setSelectedCourse(null)
    }

    const handleMarkComplete = async () => {
        try {
            const id = sessionStorage.getItem('EnrolledcoursId')
            const data = {
                progress: 100
            }
            const response = await fetch(`http://localhost:5555/updatestatus/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            if (response.ok) {
                setEnrollmentSuccess(true)
                setTimeout(() => {
                    setEnrollmentSuccess(false)
                }, 2000)
                closeModal()
            } else {
                throw new Error('Failed to mark course as complete')
            }
        } catch (error) {
            console.error('Error marking course as complete:', error)
            alert('Failed to mark course as complete. Please try again later.')
        }
    }

    return (
        <div className="container px-4 py-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">My Courses</h2>
            <input
                type="text"
                className="w-96 px-4 py-2 mb-6 rounded-md shadow-md focus:outline-none focus:ring-gray-400 pl-10"
                placeholder="Search by course name or instructor"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {isLoading ? (
                <div>Loading...</div>
            ) : error ? (
                <div className="text-left">
                    <p className="text-red-500 text-lg mb-4">No course Registered</p>
                    <p className="text-gray-500 text-sm">
                        Go to Available Courses and register for interesting courses.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {sampleCourses.map((course) => (
                        <div
                            key={course._id}
                            onClick={() => openModal(course)}
                            className="max-w-sm rounded bg-white overflow-hidden shadow-lg cursor-pointer"
                        >
                            <img className="w-full h-40 object-cover" src={Icon} alt="Thumbnail" />
                            <hr className="my-4 border-gray-300" />
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">{course.name}</div>
                                <p className="text-gray-700 text-base">Instructor: {course.instructor}</p>
                                <p className="text-gray-700 text-base">Duration: {course.duration}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {selectedCourse && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-8 max-w-md rounded shadow-lg">
                        <h2 className="text-2xl font-semibold mb-4">{selectedCourse.name}</h2>
                        <p className="text-gray-700 mb-4">Course Instructor: {selectedCourse.instructor}</p>
                        <p className="text-gray-700 mb-4">Description: {selectedCourse.description}</p>
                        <p className="text-gray-700 mb-4">Duration: {selectedCourse.duration}</p>
                        <p className="text-gray-700 mb-4">Schedule: {selectedCourse.schedule}</p>
                        <p className="text-gray-700 mb-4">Location: {selectedCourse.location}</p>
                        <p className="text-gray-700 mb-4">Pre-requisites:</p>
                        <ul className="list-disc ml-6 mb-4">
                            {selectedCourse.prerequisites.map((prerequisite, index) => (
                                <li key={index}>{prerequisite}</li>
                            ))}
                        </ul>
                        <details className="mb-4">
                            <summary className="text-gray-700 font-semibold cursor-pointer">Syllabus</summary>
                            <div className="text-gray-700 mt-2 ml-4">
                                {selectedCourse.syllabus.map((item) => (
                                    <div key={item._id}>
                                        <p className="font-semibold">
                                            Week {item.week}: {item.topic}
                                        </p>
                                        <p>{item.content}</p>
                                    </div>
                                ))}
                            </div>
                        </details>
                        {selectedCourse.enrollment === 'Open' && (
                            <button
                                onClick={handleMarkComplete}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Mark as Complete
                            </button>
                        )}
                        <button
                            onClick={closeModal}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-2"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
            {enrollmentSuccess && <AnimatedMessage message="Marked as the course Completed!" />}
        </div>
    )
}
