import { Navigate, Route, Routes } from "react-router-dom"
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useContext, useEffect, useState } from "react"
import { UserContext } from "./hooks/UserContext"

function App() {
  const { token, setToken,isAuth, setIsAuth } = useContext(UserContext)

  const verifyToken = async () => {
    if (token) {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/verify`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      if (response.status === 200) {
        const data = await response.json()
        console.log(data)
        setIsAuth(true);
      } else {
        localStorage.removeItem("accessToken")
        setToken(null)
      }
    }
  }

  useEffect(() => {
    console.log("verify token")
    if (token) {
      verifyToken()
      console.log("verify token called and token is ", token)
    }
  }, [])

  return (<>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={!isAuth ? <Login setIsAuth={setIsAuth} /> : <Navigate to={"/dashboard"} />} />
      <Route path="/register" element={!isAuth ? <Register /> : <Navigate to={"/dashboard"} />} />
      <Route path="/dashboard" element={isAuth ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover={false}
      theme="dark"
      transition:Bounce
    />
  </>
  )
}

export default App
