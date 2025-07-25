import React from 'react'
import { Link } from 'react-router-dom'

function Dashboard() {

    const handleLogout = () => {
        localStorage.removeItem('token')
        window.location.href = '/login'
    }
    return (
        <div>
            <h1>Welcome to Dashboard</h1>
            <p>Only authenticated users can see this page.</p>
            <button onClick={handleLogout}>Logout</button>
            <Link to="/jobs">See all jobs</Link>
        </div>
    )
}

export default Dashboard