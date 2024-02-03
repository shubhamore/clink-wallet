import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../hooks/UserContext'
import { toast } from 'react-toastify'

export default function Dashboard() {
    const { user, token, updateUser , logout} = useContext(UserContext)
    const [transferDetails, setTransferDetails] = useState({ receiver_username: "", amount: 0 })

    const sendMoney = async (event) => {
        event.preventDefault()
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
            toast.error("insufficient balance")
        }
        if (response.status === 404) {
            toast.warning("user not found")
        } else if (response.status === 200) {
            toast.success("transfer successful")
            await updateUser()
        } else {
            toast.error("error")
        }
    }

    useEffect(() => {
        console.log(user)
    }, [])

    return (<>
        <div>Dashboard</div>
        <button onClick={logout}>Logout</button>
        <h1>Welcome {user?.username},</h1>
        <h1>Recent Transactions</h1>
        <h1>Balance: ₹ {user?.balance}</h1>
        <h1>Transfer funds</h1>
        <form onSubmit={sendMoney}>
            <input type="text" placeholder="receiver's username" onChange={(e) => setTransferDetails({ ...transferDetails, receiver_username: e.target.value })} />
            <input type="number" placeholder="amount" onChange={(e) => setTransferDetails({ ...transferDetails, amount: e.target.value })} />
            <button type="submit">Transfer</button>
        </form>
    </>
    )
}
