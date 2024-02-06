import React from 'react'
import { toast } from 'react-toastify'
import { useContext, useState } from 'react'
import { UserContext } from '../hooks/UserContext'
import Navbar from '../components/Navbar'
import Profile from '../components/Profile'


export default function Payment() {
    const { user, token, updateUser } = useContext(UserContext)
    const [transferDetails, setTransferDetails] = useState({ receiver_username: "", amount: 0, password: "" })
    const [isLoading, setIsLoading] = useState(false)

    const sendMoney = async (event) => {
        event.preventDefault()
        setIsLoading(true)
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/transfer`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ ...transferDetails, sender: user.username })
        })
        const data = await response.json()
        console.log(data)
        if (response.status === 400) {
            if (data === "wrong password") {
                toast.error("wrong password")
            }
            else if (data === "insufficient balance") {
                toast.error("insufficient balance")
            }
        }
        else if (response.status === 404) {
            toast.warning("user not found")
        } else if (response.status === 200) {
            toast.success("transfer successful")
            await updateUser()
        } else {
            toast.error("error")
        }
        setIsLoading(false)
        setTransferDetails({ receiver_username: "", amount: 0, password: "" })
    }

    return (
        <>
            <Navbar />
            <h1 className='text-7xl mt-20 text-center'>Payment</h1>
            <Profile />
            {!isLoading ? (
                <>
                    <h1 className='text-3xl text-center mb-5'>Transfer funds</h1>
                    <form onSubmit={sendMoney} className='flex flex-col w-[300px] max-w-full px-[25px] py-[15px] border-2 border-slate-50 rounded-lg '>
                        <input className='bg-transparent px-3 py-2 focus:outline-0 my-3 border-b-2 border-gray-200' type="text" placeholder="receiver's username" onChange={(e) => setTransferDetails({ ...transferDetails, receiver_username: e.target.value })} />
                        <input className='bg-transparent px-3 py-2 focus:outline-0 my-3 border-b-2 border-gray-200' type="number" min={0} step={0.01} placeholder="amount" onChange={(e) => setTransferDetails({ ...transferDetails, amount: e.target.value })} />
                        <input className='bg-transparent px-3 py-2 focus:outline-0 my-3 border-b-2 border-gray-200' type="password" placeholder="password" onChange={(e) => setTransferDetails({ ...transferDetails, password: e.target.value })} />
                        <button className='w-full bg-slate-600 py-2 rounded-sm' type="submit">Transfer</button>
                    </form>
                    <div className='mb-20'></div>
                </>) :
                (<h1 className='text-3xl text-center mb-5'>Loading...</h1>)}
        </>
    )
}
