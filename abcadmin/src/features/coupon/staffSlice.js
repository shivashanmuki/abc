import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import staffService from "./staffService"; // Update to correct path

export const getAllStaff = createAsyncThunk(
  "staff/get-all",
  async (_, thunkAPI) => {
    try {
      return await staffService.getAllStaff();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getAStaff = createAsyncThunk(
  "staff/get-staff",
  async (id, thunkAPI) => {
    try {
      return await staffService.getAStaff(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createStaff = createAsyncThunk(
  "staff/create-staff",
  async (staffData, thunkAPI) => {
    try {
      return await staffService.createStaff(staffData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateStaff = createAsyncThunk(
  "staff/update-staff",
  async (staffData, thunkAPI) => {
    try {
      return await staffService.updateStaff(staffData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteStaff = createAsyncThunk(
  "staff/delete-staff",
  async (id, thunkAPI) => {
    try {
      return await staffService.deleteStaff(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const resetState = createAction("staff/reset-state");

const initialState = {
  staff: [],
  staffDetail: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllStaff.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllStaff.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.staff = action.payload.data; // Access 'data' field from API response
      })
      .addCase(getAllStaff.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.message || "Failed to fetch staff"; // Update to match error structure
      })
      .addCase(getAStaff.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAStaff.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.staffDetail = action.payload.data; // Access 'data' field from API response
      })
      .addCase(getAStaff.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message =
          action.payload.message || "Failed to fetch staff details"; 
      })
      .addCase(createStaff.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createStaff.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.staff.push(action.payload.data); 
      })
      .addCase(createStaff.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.message || "Failed to create staff"; 
      })
      .addCase(updateStaff.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateStaff.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        const updatedStaff = action.payload.data;
        state.staff = state.staff.map((staff) =>
          staff.id === updatedStaff.id ? updatedStaff : staff
        );
      })
      .addCase(updateStaff.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.message || "Failed to update staff"; 
      })
      .addCase(deleteStaff.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteStaff.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.staff = state.staff.filter(
          (staff) => staff.id !== action.payload.data.id
        );
      })
      .addCase(deleteStaff.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.message || "Failed to delete staff"; 
      })
      .addCase(resetState, () => initialState);
  },
});

export default staffSlice.reducer;
