import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteJob, getJobs } from '../../../features/jobs/JobSlice'
import JobForm from './JobForm'
import JobCard from './JobCard'


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
                {jobs && jobs.length > 0 && jobs.map(job => (
                    <JobCard key={job._id} job={job} onEdit={(job) => setEditing(job)} onDelete={(id) => handleDelete(id)} />

                ))}
            </ul>
        </div>
    )
}

export default JobList