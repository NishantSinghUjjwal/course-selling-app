import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import CourseCard from './CourseCard'
import { getAccessToken } from '../reusableFunctions'
import AddCourse, { Course as Cr } from './AddCourse'
import { atom, useSetRecoilState } from 'recoil'

const Course = () => {
    const { courseId } = useParams()
    const setCourse = useSetRecoilState<Cr>(courseState)
    useEffect(() => {
        fetch(`http://localhost:5008/admin/course/${courseId}`, {
            method: "GET",
            headers: {
                authorization: getAccessToken()
            }
        }).then(res => res.json()).then(data => {
            if (data.course)
                setCourse(data.course)
        })
    }, [courseId])
    console.log("course rendered")
    return (
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <CourseCard />
            <AddCourse toUpdateCourse />
        </div>
    )
}

export default Course
export const courseState = atom({
    key: "CourseState",
    default: {
        "title": "",
        "description": "",
        "price": 0,
        "imageLink": "",
        "published": false
    }
})