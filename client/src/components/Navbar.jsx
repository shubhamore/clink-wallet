import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../hooks/UserContext'


export default function Navbar() {
    const { logout } = useContext(UserContext)

    return (
        <div className='backdrop-blur fixed top-0 w-full z-50 dashboard'>
            <nav className='flex justify-between items-center w-11/12 mx-auto px-14 '>
                <div className='text-[35px] icon-heading gradient-text'><Link to="/dashboard">Clink</Link></div>
                <div className="text-[25px] flex gap-11">
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/payment">Payment</Link>
                </div>
                <div className="text-[25px]"><button onClick={logout}>Logout</button></div>
            </nav>
        </div>
    )
}
