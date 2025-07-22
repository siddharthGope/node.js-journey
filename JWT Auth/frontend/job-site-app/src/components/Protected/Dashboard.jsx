import React from 'react'

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
        </div>
    )
}

export default Dashboard