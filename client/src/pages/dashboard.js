import React, { useState, useEffect } from 'react'
import Icon from './../assets/icon.png'
import Card from './../components/card/index'

export default function Dashboard() {
    const [sampleCourses, setSampleCourses] = useState([])

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
                courseName: course.name,
                instructorName: course.instructor,
                thumbnail: Icon,
                dueDate: course.dueDate,
                progress: course.progress
            }))
            setSampleCourses(mappedData)
        } catch (error) {
            console.error('Error fetching course data:', error)
        }
    }

    return (
        <div className="container mx-auto px-4">
            <h2 className="text-xl font-medium text-left mb-4 mt-2">Welcome Poovarasan, to Alemeno Course Portal</h2>
            <div className="flex flex-wrap -mx-4">
                {sampleCourses.map((course, index) => (
                    <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-4">
                        <Card
                            courseName={course.courseName}
                            instructorName={course.instructorName}
                            thumbnail={course.thumbnail}
                            dueDate={course.dueDate}
                            progress={course.progress}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
