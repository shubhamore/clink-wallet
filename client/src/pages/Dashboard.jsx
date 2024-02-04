import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../hooks/UserContext'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { format, parseISO, set, subDays } from 'date-fns'
import Navbar from '../components/Navbar'
import Profile from '../components/Profile'

export default function Dashboard() {
    const { user, token, updateUser, logout } = useContext(UserContext)
    // const [transferDetails, setTransferDetails] = useState({ receiver_username: "", amount: 0 })
    const [transactions, setTransactions] = useState([{}])
    const [loading, setLoading] = useState(true)
    const [balanceHistory, setBalanceHistory] = useState([])
    const [moneySent, setMoneySent] = useState([])
    const [moneyReceived, setMoneyReceived] = useState([])

    // const sendMoney = async (event) => {
    //     event.preventDefault()
    //     const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/transfer`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": `Bearer ${token}`
    //         },
    //         body: JSON.stringify({ ...transferDetails, sender: user.username })
    //     })
    //     const data = await response.json()
    //     console.log(data)
    //     if (response.status === 400) {
    //         toast.error("insufficient balance")
    //     }
    //     if (response.status === 404) {
    //         toast.warning("user not found")
    //     } else if (response.status === 200) {
    //         toast.success("transfer successful")
    //         await updateUser()
    //         getUserTransactions()
    //     } else {
    //         toast.error("error")
    //     }
    // }

    const getUserTransactions = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/transactions/${user.username}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();

            if (response.status === 404) {
                toast.warning('user not found');
            } else if (response.status === 500) {
                toast.error('error', data);
            } else if (response.status === 200) {
                setBalanceHistory(data.balanceHistory)
                setMoneySent(data.moneySent)
                setMoneyReceived(data.moneyReceived)
                setTransactions(data.sortedData)
            }
            console.log(data);
            setLoading(false);

        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    useEffect(() => {
        console.log(transactions)
    }, [transactions])


    useEffect(() => {
        getUserTransactions()
        console.log(user)
    }, [])

    function CustomTooltip({ active, payload, label }) {
        if (active) {
            return (
                <div className="custom-tooltip">
                    <h4>{format(parseISO(label), "do MMM, h:mm a")}</h4>
                    <p className="label">₹ {payload[0].value}</p>
                </div>
            );
        }
        return null;
    }

    return (<>
        {loading ? (<div>loading...</div>) : (<>
            {/* <div className='backdrop-blur fixed top-0 w-full z-50 dashboard'>
                <nav className='flex justify-between items-center w-11/12 mx-auto px-14 '>
                    <div className='text-[35px] icon-heading gradient-text'><Link to="/dashboard">Clink</Link></div>
                    <div className="text-[25px] flex gap-11">
                        <Link to="/dashboard">Dashboard</Link>
                        <Link to="/payment">Payment</Link>

                    </div>
                    <div className="text-[25px]"><button onClick={logout}>Logout</button></div>
                </nav>
            </div> */}
            <Navbar />
            <h1 className='text-7xl mt-20 text-center'>Dashboard</h1>
            <Profile/>
            {/* <div className='flex justify-between items-left w-10/12 rounded-2xl px-7 py-10 mx-auto my-10 flex-col bg-slate-500'>
                <div className='text-4xl'>Welcome {user?.name},</div>
                <div className='text-4xl'>Username: {user?.username}</div>
                <div className='text-4xl'>Email: {user?.email}</div>
                <div className='text-4xl'>Balance: ₹ {user?.balance}</div>
            </div> */}

            {balanceHistory.length ? (<>
                <ResponsiveContainer width="90%" height={400}>
                    <AreaChart data={balanceHistory}>
                        <Area dataKey="balance" stroke='#2451B7' />
                        <XAxis dataKey="date" tickFormatter={str => {
                            const date = parseISO(str);
                            if (date.getDate() % 2 === 0) {
                                return format(date, "MMM, do, h:mm a")
                            }
                            return ""
                        }} />
                        <YAxis dataKey="balance" tickFormatter={(n) => `₹ ${n}`} />
                        <Tooltip content={<CustomTooltip />} />
                        <CartesianGrid opacity={0.2} vertical={false} />
                        <Legend />
                    </AreaChart>
                </ResponsiveContainer>
                <h1 className='text-4xl mb-20 text-center'>Account-Balance vs Time</h1>
            </>) : <h1 className='text-2xl mb-20 text-center'>No transactions yet Hence this graph is not visible</h1>}

            {moneySent.length ? (<>
                <ResponsiveContainer width="90%" height={400}>
                    <AreaChart data={moneySent}>
                        <Area dataKey="amount" stroke='#d41717' />
                        <XAxis dataKey="date" tickFormatter={str => {
                            const date = parseISO(str);
                            if (date.getDate() % 2 === 0) {
                                return format(date, "MMM, do, h:mm a")
                            }
                            return ""
                        }} />
                        <YAxis dataKey="amount" tickFormatter={(n) => `₹ ${n}`} />
                        <Tooltip content={<CustomTooltip />} />
                        <CartesianGrid opacity={0.2} vertical={false} />
                        <Legend />
                    </AreaChart>
                </ResponsiveContainer>
                <h1 className='text-4xl mb-20 text-center'>Amount Sent vs Time</h1>
            </>) : <h1 className='text-2xl mb-20 text-center'>No money Sent yet Hence this graph is not visible</h1>}

            {moneyReceived.length ? (<>
                <ResponsiveContainer width="90%" height={400}>
                    <AreaChart data={moneyReceived}>
                        <Area dataKey="amount" stroke='#21d417' />
                        <XAxis dataKey="date" tickFormatter={str => {
                            const date = parseISO(str);
                            if (date.getDate() % 2 === 0) {
                                return format(date, "MMM, do, h:mm a")
                            }
                            return ""
                        }} />
                        <YAxis dataKey="amount" tickFormatter={(n) => `₹ ${n}`} />
                        <Tooltip content={<CustomTooltip />} />
                        <CartesianGrid opacity={0.2} vertical={false} />
                        <Legend />
                    </AreaChart>
                </ResponsiveContainer>
                <h1 className='text-4xl mb-20 text-center'>Amount Received vs Time</h1>

            </>) : <h1 className='text-2xl mb-20 text-center'>No money Received yet Hence this graph is not visible</h1>}

            <div className='my-20'></div>

            <table className='w-10/12 mx-auto'>
                <thead>
                    <tr>
                        <th className='text-2xl text-center'>Date</th>
                        <th className='text-2xl text-center'>Sender</th>
                        <th className='text-2xl text-center'>Receiver</th>
                        <th className='text-2xl text-center'>Amount</th>
                        <th className='text-2xl text-center'>Balance</th>
                    </tr>
                </thead>
                <tbody className='tableContainer'>
                    {transactions.slice().reverse().map((transaction, index) => {
                        const isUserSender = transaction.sender === user.username;
                        const amountClass = isUserSender ? 'text-red-500' : 'text-green-500';
                        return (
                            <tr key={index}  >
                                <td className='text-center'>{format(parseISO(transaction.createdAt), "do MMM, h:mm a")}</td>
                                <td className='text-center'>{transaction.sender}</td>
                                <td className='text-center'>{transaction.receiver}</td>
                                <td className={`text-center ${amountClass}`}>₹ {transaction.amount}</td>
                                <td className='text-center'>₹ {transaction.sender_balance}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            <div className='my-20'></div>
            {/* <h1>Recent Transactions</h1>
            <h1>Transfer funds</h1>
            <form onSubmit={sendMoney}>
                <input className='text-black' type="text" placeholder="receiver's username" onChange={(e) => setTransferDetails({ ...transferDetails, receiver_username: e.target.value })} />
                <input className='text-black' type="number" min={0} step={0.01} placeholder="amount" onChange={(e) => setTransferDetails({ ...transferDetails, amount: e.target.value })} />
                <button type="submit">Transfer</button>
            </form> */}
        </>)}
    </>
    )
}
