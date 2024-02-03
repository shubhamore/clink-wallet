import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
export default function Register() {
    const [user, setUser] = useState({username: "", email: "", password: "", name: ""})
    const navigate = useNavigate()
    
    const userRegister = async (event) => {
        event.preventDefault()
        const response= await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        const data = await response.json()
        if(response.status === 400){
            if(data==="username already exists"){
                toast.error("username already exists")
            } else if(data==="email already exists"){
                toast.error("email already exists")
            }   
        } else{
            console.log(data)
            toast.success("register successful")
            navigate('/login')
        }
    }

    return (<>
        <div>Register</div>
        <form onSubmit={userRegister}>
            <input type="text" placeholder="username" onChange={(e) => setUser({...user, username: e.target.value})} />
            <input type="email" placeholder="email" onChange={(e) => setUser({...user, email: e.target.value})} />
            <input type="password" placeholder="password" onChange={(e) => setUser({...user, password: e.target.value})} />
            <input type="text" placeholder="name" onChange={(e) => setUser({...user, name: e.target.value})} />
            <br />
            <button type="submit">Register</button>
        </form>
    </>
    )
}
