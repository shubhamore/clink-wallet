import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../hooks/UserContext'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import HomeNav from '../components/HomeNav'
export default function Login({ setIsAuth }) {
  const { token, setToken, setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const userLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);
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
    setIsLoading(false);
  };

  return (
    <>
      <HomeNav />
      <div className='gradiant-3'></div>
      {/* <div className='text-white'>Login</div> */}
      {!isLoading ? (
        <>
          <form onSubmit={userLogin} className='flex flex-col w-[300px] max-w-full px-[25px] py-[15px] border-2 border-slate-50 rounded-lg '>
            <input className='bg-transparent px-3 py-2 focus:outline-0 my-3 border-b-2 border-gray-200' type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            <input className='bg-transparent px-3 py-2 focus:outline-0 my-3 border-b-2 border-gray-200' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button className='w-full bg-slate-600 py-2 rounded-sm' type="submit">Login</button>
          </form>
          <h1 className='my-5'>Don't have an account?<span className='text-gray-300'> <Link to="/register">Register</Link></span></h1>
        </>) : (<h1 className='text-3xl text-center'>Loading...</h1>)}
    </>
  );
}