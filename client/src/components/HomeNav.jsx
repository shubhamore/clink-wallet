import React from 'react'
import { Link } from "react-router-dom"

export default function HomeNav() {
  return (
    <div className='backdrop-blur fixed top-0 w-full z-50'>
      <nav className='flex justify-between items-center w-11/12 mx-auto px-14 '>
        <div className='text-[35px] icon-heading'><Link to="/">Clink</Link></div>
        <ul className='flex space-x-5 p-5 items-center'>
          <li className='bg-white text-black p-3'><Link to="/register">Register</Link></li>
          <li className='p-3'><Link to="/login">Login</Link></li>
        </ul>
      </nav>
    </div>
  )
}
