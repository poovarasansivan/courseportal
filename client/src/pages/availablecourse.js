import React, { useState, useEffect } from 'react'
import Icon from '../assets/icon.png'
import AnimatedMessage from '../components/AnimatedMessage'

export default function CourseListing() {
    // State variables
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCourse, setSelectedCourse] = useState(null)
    const [sampleCourses, setSampleCourses] = useState([])
    const [enrollmentSuccess, setEnrollmentSuccess] = useState(false)
    const [registrationSuccess, setRegistrationSuccess] = useState(false)

    const filteredCourses = sampleCourses.filter((course) => {
        const searchTermLowerCase = searchTerm.toLowerCase()
        return (
            course.name.toLowerCase().includes(searchTermLowerCase) ||
            course.instructor.toLowerCase().includes(searchTermLowerCase)
        )
    })

    useEffect(() => {
        fetchAvailableCourseData()
    }, [])

    async function fetchAvailableCourseData() {
        try {
            const response = await fetch('http://localhost:5555/getcourse')
            if (!response.ok) {
                throw new Error('Failed to fetch course data')
            }
            const data = await response.json()
            const mappedData = data.map((course) => ({
                courseId: course.courseId,
                name: course.name,
                instructor: course.instructor,
                description: course.description,
                thumbnail: Icon,
                duration: course.duration,
                schedule: course.schedule,
                location: course.location,
                enrollment: course.enrollment,
                prerequisites: course.prerequisites,
                syllabus: course.syllabus
            }))
            setSampleCourses(mappedData)
        } catch (error) {
            console.error('Error fetching course data:', error)
        }
    }

    // Open modal for selected course
    const openModal = (course) => {
        setSelectedCourse(course)
        sessionStorage.setItem('courseId', course.courseId)
        sessionStorage.setItem('courseName', course.name)
    }

    // Close modal
    const closeModal = () => {
        setSelectedCourse(null)
    }

    // Handle course enrollment
    const handleEnroll = async () => {
        sessionStorage.setItem('EnrolledcoursId', selectedCourse.courseId)
        sessionStorage.setItem('EnrolledcoursName', selectedCourse.name)

        try {
            const data = {
                courseId: selectedCourse.courseId,
                name: selectedCourse.name,
                progress: 10
            }
            const response = await fetch('http://localhost:5555/enrollcourse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            if (response.ok) {
                setRegistrationSuccess(true)
                setEnrollmentSuccess(true)
                setTimeout(() => {
                    setEnrollmentSuccess(false)
                }, 2000)
                closeModal()
            } else {
                throw new Error('Failed to enroll in the course')
            }
        } catch (error) {
            console.error('Error enrolling in the course:', error)
            alert('Failed to enroll in the course. Please try again later.')
        }
    }

    return (
        <div className="container px-4 py-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Available Courses</h2>
            {/* Search input */}
            <input
                type="text"
                className="w-96 px-4 py-2 mb-6 rounded-md shadow-md focus:outline-none focus:ring-gray-400 pl-10"
                placeholder="Search by course name or instructor"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* Display available courses */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCourses.map((course) => (
                    <div
                        key={course.id}
                        onClick={() => openModal(course)}
                        className="max-w-sm rounded bg-white overflow-hidden shadow-lg cursor-pointer"
                    >
                        <img className="w-full h-40 object-cover" src={course.thumbnail} alt="Thumbnail" />
                        <hr className="my-4 border-gray-300" />
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{course.name}</div>
                            <p className="text-gray-700 text-base">Instructor: {course.instructor}</p>
                            <p className="text-gray-700 text-base">Duration: {course.duration}</p>
                        </div>
                    </div>
                ))}
            </div>
            {/* Modal for selected course */}
            {selectedCourse && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-8 max-w-md rounded shadow-lg">
                        {/* Course details */}
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
                                    <div key={item.week}>
                                        <p className="font-semibold">
                                            Week {item.week}: {item.topic}
                                        </p>
                                        <p>{item.content}</p>
                                    </div>
                                ))}
                            </div>
                        </details>
                        {/* Enroll button */}
                        {selectedCourse.enrollment === 'Open' && !registrationSuccess && (
                            <button
                                onClick={handleEnroll}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Enroll
                            </button>
                        )}
                        {/* Close button */}
                        <button
                            onClick={closeModal}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-2"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
            {/* Enrollment success message */}
            {enrollmentSuccess && <AnimatedMessage message="Enrolled in the course!" />}
        </div>
    )
}
