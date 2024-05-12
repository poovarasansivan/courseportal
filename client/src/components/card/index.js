import React from 'react'

export default function Card({ courseName, instructorName, thumbnail, dueDate, progress }) {
    return (
        <div className="max-w-sm rounded bg-white overflow-hidden shadow-lg h-full flex flex-col">
            <img className="w-full h-40 object-cover" src={thumbnail} alt="Thumbnail" />
            <hr className="my-4 border-gray-300" />
            <div className="flex-grow flex flex-col justify-between">
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{courseName}</div>
                    <p className="text-gray-700 text-base">Instructor: {instructorName}</p>
                    <p className="text-gray-700 text-base">Due Date: {dueDate}</p>
                    <div className="h-2 mt-2 bg-gray-200 rounded">
                        <div className="h-full bg-green-500 rounded" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
