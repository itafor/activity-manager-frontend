import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { appointmentService } from "../services/appointment.service";

export const getAllAppointment = createAsyncThunk(
  "appointment/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await appointmentService.getAll();
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getOneAppointment = createAsyncThunk(
  "appointment/getOne",
  async (data, { rejectWithValue }) => {
    try {
      const response = await appointmentService.getOne(data);
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
  name: "appointments",
  initialState,
  reducers: {
    checkAll: (state) => {
      state.isChecked = !state.isChecked;
    },
  },
  extraReducers: {
    [getAllAppointment.pending]: (state) => {
      if (state.data.length <= 0) {
        state.loading = true;
      }
    },
    [getAllAppointment.fulfilled]: (state, action) => {
      state.error = false;
      state.data = action.payload;
      state.loading = false;
    },
    [getAllAppointment.rejected]: (state, action) => {
      state.error = true;
      state.message = action.payload;
      state.loading = false;
    },

    [getOneAppointment.pending]: (state) => {
      state.loading = true;
    },
    [getOneAppointment.fulfilled]: (state, { payload }) => {
      state.message = payload?.message;
      state.loading = false;
      state.singleData = payload.data;
    },
    [getOneAppointment.rejected]: (state, { payload }) => {
      state.error = true;
      state.message = payload;
      state.loading = false;
    },
  },
});

export const action = slice.actions;
export default slice.reducer;
