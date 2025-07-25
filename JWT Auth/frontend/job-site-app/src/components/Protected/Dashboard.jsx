import React from 'react'
import { Link } from 'react-router-dom'

function Dashboard() {
    return (
        <div>
            <h1>Welcome to Dashboard</h1>
            <p>Only authenticated users can see this page.</p>
            <Link to="/jobs">See all jobs</Link>
        </div>
    )
}

export default Dashboard