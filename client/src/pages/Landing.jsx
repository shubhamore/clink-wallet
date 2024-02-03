import React from 'react'
import { Link } from "react-router-dom"

export default function Landing() {
  return (<>
    <div>Landing</div>
    <Link to="/login">Login</Link>
    <Link to="/register">Register</Link>
  </>
  )
}
