import React, { useEffect } from 'react'
import { useContext } from 'react'
import { UserContext } from '../hooks/UserContext'

export default function Dashboard() {
    const { user } = useContext(UserContext)

    useEffect(()=>{
        console.log(user)
    },[])

  return (<>
    <div>Dashboard</div>

  </>
  )
}
