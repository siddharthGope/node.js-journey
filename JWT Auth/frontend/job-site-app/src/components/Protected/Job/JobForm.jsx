import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { createJob, updateJob } from '../../../features/jobs/JobSlice';


function JobForm({ editJob, onComplete }) {

    const [form, setForm] = useState(editJob || { title: '', company: '', status: 'applied', date: '', notes: '' });

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (editJob) {
            dispatch(updateJob({ id: editJob._id, data: form }))
        }
        else {
            dispatch(createJob(form))
        }

        onComplete?.()
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Job title' value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                <input type="text" placeholder='Company' value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                <input type="date" placeholder='Date' value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                <textarea type="text" placeholder='Notes' value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />

                <select value={form.status} onChange={e => { setForm({ ...form, status: e.target.value }); console.log(e.target.value) }}>
                    <option value='applied'>Applied</option>
                    <option value='interview'>Interview</option>
                    <option value='offer'>Offer</option>
                    <option value='rejected'>Rejected</option>
                </select>

                <button type='submit'>{editJob ? 'Update' : 'Create'}</button>

            </form>
        </div>
    )
}

export default JobForm