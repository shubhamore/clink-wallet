import React from 'react'
import { createContext, useState, useEffect } from 'react'

export const UserContext = createContext()

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(localStorage.getItem("user")) || null
  const [token, setToken] = useState(localStorage.getItem("accessToken")) || null
  const [isAuth, setIsAuth] = useState(false)

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
        localStorage.removeItem("user")
        setToken(null)
      }
    }
  }

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")))
    setToken(localStorage.getItem("accessToken"))
    console.log("verify token")
    if (token) {
      verifyToken()
      console.log("verify token called and token is ", token)
    }
  }, [])

  const updateUser = async () => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/${user.username}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    const data = await response.json()
    setUser(data)
    localStorage.setItem("user", JSON.stringify(data))
  }

  const logout = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("user")
    setToken(null)
    setUser(null)
    setIsAuth(false)
  }

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken, isAuth, setIsAuth, updateUser, logout }}>
      {children}
    </UserContext.Provider>
  )
}
