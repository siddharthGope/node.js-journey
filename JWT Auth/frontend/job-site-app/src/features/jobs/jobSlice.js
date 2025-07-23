import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getJob } from "../../services/jobServices";
import { act } from "react";

const BASE_URL = "http://localhost:6200/jobs";

// get token from localStorage

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

//Thunk

export const getJobs = createAsyncThunk("jobs", async () => {
  const result = await axios.get(BASE_URL, getAuthHeader());
  return result.data;
});

export const createJob = createAsyncThunk("jobs/create", async (jobData) => {
  const response = await axios.post(BASE_URL, jobData, getAuthHeader());
  return response.data;
});

export const updateJob = createAsyncThunk("jobs/:id", async (id) => {
  const response = await axios.put(`${BASE_URL}/${id}`, getAuthHeader());
  return response.data;
});

export const deleteJob = createAsyncThunk("jobs/delete", async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`, getAuthHeader());
  return response.data;
});

//slice

const jobSlice = createSlice({
  name: "jobs",

  initialState: {
    jobs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // getjobs
      .addCase(getJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getJob.fulfilled, (state, action) => {
        (state.loading = false), (state.jobs = action.payload);
      })
      .addCase(getJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //create job

      .addCase(createJob.fulfilled, (state, action) => {
        state.jobs.push(action.payload);
      })

      //update job

      .addCase(updateJob.fulfilled, (state, action) => {
        const index = state.jobs.findIndex(
          (job) => job._id === action.payload._id
        );
        if (index >= 0) return (state.jobs[index] = action.payload);
      })

      //delete job

      .addCase(deleteJob.fulfilled, (state, action) => {
        state.jobs = state.jobs.filter((job) => job._id !== action.payload);
      });
  },
});

export default jobSlice.reducer;
