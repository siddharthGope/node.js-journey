import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:6200/jobs";

// get token from localStorage

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

//Thunk

export const getJobs = createAsyncThunk("/all-jobs", async () => {
  const result = await axios.post(`${BASE_URL}/all-jobs`, {}, getAuthHeader());
  return result.data;
});

export const createJob = createAsyncThunk("/create-job", async (jobData) => {
  const response = await axios.post(
    `${BASE_URL}/create-job`,
    jobData,
    getAuthHeader()
  );
  return response.data;
});

export const updateJob = createAsyncThunk(
  "/update/:id",
  async (id, jobData) => {
    const response = await axios.put(
      `${BASE_URL}/update/${id}`,
      jobData,
      getAuthHeader()
    );
    return response.data;
  }
);

export const deleteJob = createAsyncThunk("/delete/:id", async (id) => {
  const response = await axios.delete(
    `${BASE_URL}/delete/${id}`,
    getAuthHeader()
  );
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
      .addCase(getJobs.fulfilled, (state, action) => {
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
