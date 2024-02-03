import React from 'react'
import {createContext,useState} from 'react'

export const UserContext=createContext()

export default function UserContextProvider({ children }) {
    const [user,setUser]=useState(null)
    const [token,setToken]=useState(localStorage.getItem("accessToken")) || null
    const [isAuth, setIsAuth] = useState(false)
    
  return (
    <UserContext.Provider value={{user,setUser,token,setToken,isAuth, setIsAuth}}>
        {children}
    </UserContext.Provider>
  )
}
