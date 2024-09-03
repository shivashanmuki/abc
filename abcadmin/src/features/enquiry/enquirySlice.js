import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";

export const getEnquiries = createAsyncThunk(
  "enquiry/get-enquiries",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:8088/enquiries/with-responses`
      );
      return response.data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching responses for a specific enquiry
export const getEnquiryResponses = createAsyncThunk(
  "enquiry/get-enquiry-responses",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:8088/enquiries/eng-allo/${id}`
      );
      return response.data.data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


// Async thunk for updating an enquiry
export const updateAEnquiry = createAsyncThunk(
  "enquiry/update-enquiry",
  async (enq, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://localhost:8088/enquiries/${enq.id}`,
        enq
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for deleting an enquiry
export const deleteAEnquiry = createAsyncThunk(
  "enquiry/delete-enquiry",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(
        `http://localhost:8088/enquiries/${id}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Action to reset the state
export const resetState = createAction("Reset_all");

// Initial state for the slice
const initialState = {
  enquiries: [],
  responses: [],
  enqName: "",
  enqMobile: "",
  enqEmail: "",
  enqComment: "",
  enqStatus: "",
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

// Slice for handling enquiries
export const enquirySlice = createSlice({
  name: "enquiries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEnquiries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEnquiries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.enquiries = action.payload;
      })
      .addCase(getEnquiries.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message;
      })
      .addCase(getEnquiryResponses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEnquiryResponses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.responses = action.payload.data || [];
      })
      .addCase(getEnquiryResponses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message;
      })
      .addCase(updateAEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedEnquiry = action.payload;
      })
      .addCase(updateAEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message;
      })
      .addCase(deleteAEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedEnquiry = action.payload;
      })
      .addCase(deleteAEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message;
      })
      .addCase(resetState, () => initialState);
  },
});

export default enquirySlice.reducer;
