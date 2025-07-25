import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteJob, getJobs } from '../../../features/jobs/JobSlice'
import JobForm from './JobForm'


function JobList() {

    const { jobs, loading } = useSelector(state => state.jobs)
    const dispatch = useDispatch()
    const [editing, setEditing] = useState(null)


    useEffect(() => {
        dispatch(getJobs())
    }, [dispatch]);


    const handleDelete = (id) => {
        dispatch(deleteJob(id))
    }

    if (loading) return <p>Loading ....</p>

    return (
        <div>
            <h2>Job Applications</h2>
            <JobForm onComplete={() => setEditing(null)} editJob={editing} />

            <ul>
                {jobs.map(job => (
                    <li key={job._id}>
                        <strong>{job.title}</strong> @ {job.company} ({job.status}) - {job.date} - {job.notes}

                        <button onClick={() => setEditing(job)}>Edit</button>
                        <button onClick={() => handleDelete(job._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default JobList