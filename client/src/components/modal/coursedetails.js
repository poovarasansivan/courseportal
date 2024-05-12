import React from 'react'

export default function CourseDetailsModal({ course, closeModal }) {
    return (
        <div className="bg-white p-8 max-w-md rounded shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">{course.name}</h2>
            <p className="text-gray-700 mb-4">Instructor: {course.instructor}</p>
            <p className="text-gray-700 mb-4">Due Date: {course.dueDate}</p>
            <p className="text-gray-700 mb-4">Progress: {course.progress}%</p>
            {/* Add additional course information */}
            <p className="text-gray-700 mb-4">Description: {course.description}</p>
            <p className="text-gray-700 mb-4">Enrollment Status: {course.enrollmentStatus}</p>
            <p className="text-gray-700 mb-4">Duration: {course.duration}</p>
            <p className="text-gray-700 mb-4">Schedule: {course.schedule}</p>
            <p className="text-gray-700 mb-4">Location: {course.location}</p>
            <p className="text-gray-700 mb-4">Pre-requisites: {course.prerequisites}</p>
            {/* Add expandable syllabus section */}
            <details className="mb-4">
                <summary className="cursor-pointer font-semibold">Syllabus</summary>
                <div className="pl-4">
                    <p>Syllabus content goes here...</p>
                </div>
            </details>
            {/* Close button */}
            <button onClick={closeModal} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Close
            </button>
        </div>
    )
}
