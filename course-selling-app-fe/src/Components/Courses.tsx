import React, { useEffect, useState } from 'react'
import { Course } from './AddCourse'
import { getAccessToken } from '../reusableFunctions'
import CourseCard from './CourseCard'

const Courses = () => {
    const [courses, setCourses] = useState<Course[]>([])
    useEffect(() => {
        fetch('http://localhost:5008/admin/courses', {
            method: "GET",
            headers: {
                authorization: getAccessToken()
            }
        }).then(res => res.json()).then(data => {
            if (data.courses)
                setCourses(data.courses)
        })

    }, [])
    return (
        <div style={{ padding: 40, height: "100%", overflowY: "auto" }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
                {courses.map(course => <CourseCard course={course} />)}
            </div>
        </div>
    )
}

export default Courses