import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { patientService } from "../services/patient.service";

export const getAllPatient = createAsyncThunk(
  "patient/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await patientService.getAll();
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getOnePatient = createAsyncThunk(
  "patient/getOne",
  async (data, { rejectWithValue }) => {
    try {
      const response = await patientService.getOne(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const initialState = {
  data: [],
  singleData: {},
  loading: false,
  error: false,
  message: "",
};

const slice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    checkAll: (state) => {
      state.isChecked = !state.isChecked;
    },
  },
  extraReducers: {
    [getAllPatient.pending]: (state) => {
      if (state.data.length <= 0) {
        state.loading = true;
      }
    },
    [getAllPatient.fulfilled]: (state, action) => {
      state.error = false;
      state.data = action.payload;
      state.loading = false;
    },
    [getAllPatient.rejected]: (state, action) => {
      state.error = true;
      state.message = action.payload;
      state.loading = false;
    },

    [getOnePatient.pending]: (state) => {
      state.loading = true;
    },
    [getOnePatient.fulfilled]: (state, { payload }) => {
      state.message = payload?.message;
      state.loading = false;
      state.singleData = payload;
    },
    [getOnePatient.rejected]: (state, { payload }) => {
      state.error = true;
      state.message = payload;
      state.loading = false;
    },
  },
});

export const action = slice.actions;
export default slice.reducer;
