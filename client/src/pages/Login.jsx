import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { UserContext} from '../hooks/UserContext'
import { useContext } from 'react'

export default function Login({ setIsAuth }) {
    const { token, setToken, setUser } = useContext(UserContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
  
    const userLogin = async (event) => {
      event.preventDefault();
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });
  
      if (response.status === 404) {
        toast.error("user not found");
      } else if (response.status === 400) {
        toast.warning("wrong password");
      } else {
        const data = await response.json();
        setToken(data.accessToken);
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("accessToken", data.accessToken);
        toast.success("login successful");
        setIsAuth(true); // Update isAuth state
        navigate('/dashboard');
      }
    };
  
    return (
      <>
        <div>Login</div>
        <form onSubmit={userLogin}>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          <button type="submit">Login</button>
        </form>
      </>
    );
  }