import React from 'react'
import { Link } from "react-router-dom"

export default function Cta() {
    return (
        <div className='w-full min-w-full h-screen flex justify-center items-center text-center relative'>
            <div className='rounded-3xl border-2 border-slate-50 p-14 w-4/5 h-80 flex justify-evenly items-center flex-col'>
                <h1 className='text-3xl text-slate-50'>Join Clink today and experience a new era of financial convenience. It's time to simplify your financial journey.</h1>
                <p className='bg-white text-black p-3'><Link to="/register">Register</Link></p>
            </div>
        </div>
    )
}
