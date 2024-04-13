import { Card, Typography } from '@mui/material'
import React from 'react'
import { Course } from './AddCourse'
import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { courseState } from './Course'

const CourseCard = ({ course }: { course?: Course }) => {
    const courseRecoil = useRecoilValue(courseState)
    if (!course) {
        course = courseRecoil
    }
    console.log("course card rendered")
    return (
        <Link to={`/course/${course._id}`}>
            <Card style={{ width: "300px", minHeight: "250px", cursor: "pointer" }}>
                <div style={{ padding: "10px 20px" }}>
                    <Typography variant='h5' style={{ fontWeight: '600' }}>{course.title}</Typography>
                </div>
                <img src={course.imageLink} style={{ width: "100%", height: "150px" }} />
                <div style={{ padding: "10px 20px" }}>
                    <Typography variant='h5'>{course.price} Rs</Typography>
                    <Typography variant='h6' style={{ fontSize: "12px" }}>{course.description}</Typography>
                </div>
            </Card>
        </Link>
    )
}

export default CourseCard