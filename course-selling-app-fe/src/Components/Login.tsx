import { Button, Card, TextField } from '@mui/material'
import React, { useState } from 'react'
import { User } from './Signup'

const Login = () => {
    const [user, setUser] = useState<User>({ username: "", password: "" })
    const handleLogin = async () => {
        try {

            const res = await fetch("http://localhost:5008/admin/login", {
                method: 'POST',
                headers: {
                    username: user.username,
                    password: user.password
                }
            })
            if (res.status == 200) {
                alert("Login successfully");
                const data = await res.json();
                localStorage.setItem("token", data.token)
                // navigate("/courses")
                window.location.href = "/courses"
                setTimeout(() => {
                    localStorage.removeItem("token")
                }, 3600 * 1000)
                setUser({ username: "", password: "" })
            }
        } catch (err) {
            alert(err)
        }
    }
    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
            <div style={{ height: "100%" }}>
                <div style={{ marginBottom: "10px" }}>
                    <h2 style={{ margin: "0px" }}> Welcome Back!</h2>
                    <h3 style={{ margin: "0px" }}> Lets get you signed in</h3>
                </div>
                <Card style={{ width: 400, padding: 20 }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                        <TextField value={user.username} id="outlined-basic" label="Email" type='email' variant="outlined" onChange={(e) => setUser({ ...user, username: e.target.value })} />
                        <TextField value={user.password} id="outlined-basic" type='password' label="Password" variant="outlined" onChange={(e) => setUser({ ...user, password: e.target.value })} />
                        <Button variant='contained' style={{ marginTop: "30px", background: "limegreen" }} disabled={!user.username || !user.password} onClick={handleLogin}>Sign in</Button>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default Login