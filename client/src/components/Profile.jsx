import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../hooks/UserContext'

export default function Profile() {
    const { user } = useContext(UserContext)

  return (
    <div className='flex justify-between items-left w-10/12 rounded-2xl px-7 py-10 mx-auto my-10 flex-col bg-slate-500'>
                <div className='text-4xl'>Welcome {user?.name},</div>
                <div className='text-4xl'>Username: {user?.username}</div>
                <div className='text-4xl'>Email: {user?.email}</div>
                <div className='text-4xl'>Balance: ₹ {user?.balance}</div>
            </div>
  )
}
