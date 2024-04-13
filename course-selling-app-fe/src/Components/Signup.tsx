import { Button, Card, TextField } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router'
export interface User {
    username: string,
    password: string
}
const Signup = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState<User>({ username: "", password: "" })
    const handleSignup = async () => {
        try {

            const res = await fetch("http://localhost:5008/admin/signup", {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    "Content-type": "application/json"
                }

            })
            if (res.status == 201) {
                setUser({ username: "", password: "" })
                alert("Admin created successfully")
                navigate("/login")

            }
            const result = await res.json();
            console.log(result)

        } catch (err) {
            console.log(err)
            alert(err)
        }
    }
    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div>
                <div style={{ marginBottom: "10px" }}>
                    <h2 style={{ margin: "0px" }}>Hello!</h2>
                    <h3 style={{ margin: "0px" }}> Lets get you signed up</h3>
                </div>
                <Card style={{ width: 400, padding: 20 }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                        <TextField value={user.username} id="outlined-basic" label="Email" type='email' variant="outlined" onChange={(e) => setUser({ ...user, username: e.target.value })} />
                        <TextField value={user.password} id="outlined-basic" type='password' label="Password" variant="outlined" onChange={(e) => setUser({ ...user, password: e.target.value })} />
                        <Button variant='contained' style={{ marginTop: "30px", background: "limegreen" }} disabled={!user.username || !user.password} onClick={handleSignup}>Sign up</Button>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default Signup