import { Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAccessToken } from '../reusableFunctions'

const Navbar = () => {
    const [loggedInUser, setLoggedInUser] = useState<string | boolean | undefined>("")
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        fetch("http://localhost:5008/admin/me", {
            method: "GET",
            headers: {
                authorization: getAccessToken()
            }
        }).then(res => res.json()).then(user => {
            console.log(user)
            if (user.status == 'ok') {
                setLoggedInUser(user.user)
            } else setLoggedInUser(false)
            setIsLoading(false)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 20px", position: "sticky", top: 0, left: 0, width: "100%" }}>
            <h3>Coursera</h3>
            {
                isLoading ?
                    <></>
                    :
                    loggedInUser ?
                        <>
                            <span>{loggedInUser}</span>
                            <div>
                                <Link to={"/addCourse"}><Button>Add Course</Button></Link>
                                <Button onClick={() => {
                                    localStorage.removeItem("token")
                                    window.location.href = "/login"
                                }}>
                                    Log out
                                </Button>
                            </div>
                        </>
                        :
                        <div style={{ display: "flex", gap: "10px" }}>

                            <Button>
                                <Link style={{ textDecoration: 'none', color: 'black' }} to={"/login"}>
                                    Log in
                                </Link>
                            </Button>
                            <Button variant='outlined'>
                                <Link style={{ textDecoration: 'none', color: 'black' }} to={"/signup"}>
                                    Sign up
                                </Link>
                            </Button>
                        </div>
            }
        </div>
    )
}

export default Navbar