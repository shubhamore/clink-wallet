import { Navigate, Route, Routes } from "react-router-dom"
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Payment from "./pages/Payment"
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useContext, useEffect, useState } from "react"
import { UserContext } from "./hooks/UserContext"

function App() {
  const { token, setToken,isAuth, setIsAuth,setUser } = useContext(UserContext)
  const [cursorX, setCursorX] = useState()
  const [cursorY, setCursorY] = useState()
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorX(e.clientX)
      setCursorY(e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (<div className="app text-stone-50 flex items-center justify-center">
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={!isAuth ? <Login setIsAuth={setIsAuth} /> : <Navigate to={"/dashboard"} />} />
      <Route path="/register" element={!isAuth ? <Register /> : <Navigate to={"/dashboard"} />} />
      <Route path="/dashboard" element={isAuth ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/payment" element={isAuth ? <Payment /> : <Navigate to="/login" />} />
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
    <div className="cursor" style={{left:cursorX+'px',top:cursorY+'px'}}></div>
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
  </div>
  )
}

export default App
