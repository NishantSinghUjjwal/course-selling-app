import { Button, Card, Checkbox, FormControlLabel, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getAccessToken } from '../reusableFunctions'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { courseState } from './Course'
export interface Course {
    _id?: string,
    title: string,
    description: string,
    price: number,
    imageLink: string,
    published: boolean
}
const AddCourse = ({ toUpdateCourse }: { toUpdateCourse?: boolean }) => {
    console.log("add/update course rendered")
    const [course, setCourse] = useState<Course>({
        "title": "",
        "description": "",
        "price": 0,
        "imageLink": "",
        "published": false
    })
    const setRecoilCourse = useSetRecoilState<Course>(courseState)
    const handleCourseAdd = () => {
        try {

            fetch("http://localhost:5008/admin/courses", {
                method: "POST",
                body: JSON.stringify(course),
                headers: {
                    authorization: getAccessToken(),
                    "Content-Type": 'application/json'
                }
            }).then(res => res.json()).then(result => {
                alert(result?.message)
            })
        } catch (err) {
            alert(err)
        }
    }
    const handleCourseUpdate = () => {
        try {

            fetch(`http://localhost:5008/admin/courses/${course._id}`, {
                method: "PUT",
                body: JSON.stringify(course),
                headers: {
                    authorization: getAccessToken(),
                    "Content-Type": 'application/json'
                }
            }).then(res => res.json()).then(result => {
                setRecoilCourse(course)
                alert(result?.message)
            })
        } catch (err) {
            alert(err)
        }
    }
    const courseToBeUpdated = useRecoilValue(courseState)

    useEffect(() => {
        if (toUpdateCourse) {
            setCourse(courseToBeUpdated)
        }
    }, [])
    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
            <div style={{ height: "100%" }}>
                <div style={{ marginBottom: "10px" }}>
                    <h3 style={{ margin: "0px" }}> {toUpdateCourse ? "Update this course" : 'Add a new course'}</h3>
                </div>
                <Card style={{ width: 400, padding: 20 }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                        <TextField value={course.title} id="outlined-basic" label="Title" type='text' variant="outlined" onChange={(e) => setCourse({ ...course, title: e.target.value })} />
                        <TextField value={course.description} id="outlined-basic" type='text' label="Description" variant="outlined" onChange={(e) => setCourse({ ...course, description: e.target.value })} />
                        <TextField value={course.price} id="outlined-basic" type='text' label="Price" variant="outlined" onChange={(e) => setCourse({ ...course, price: parseInt(e.target.value) })} />
                        <TextField value={course.imageLink} id="outlined-basic" type='text' label="Image Link" variant="outlined" onChange={(e) => setCourse({ ...course, imageLink: e.target.value })} />
                        <FormControlLabel
                            label="Published"
                            control={
                                <Checkbox checked={course.published} id="outlined-basic" onChange={(e) => setCourse({ ...course, published: e.target.checked })} />
                            }
                        />
                        <Button variant='contained' style={{ marginTop: "30px", background: "limegreen" }} onClick={() => {
                            if (toUpdateCourse) {
                                handleCourseUpdate()
                            } else {
                                handleCourseAdd()
                            }
                        }}>{toUpdateCourse ? "Update" : "Add"}</Button>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default AddCourse