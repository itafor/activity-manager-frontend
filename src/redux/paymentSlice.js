import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { paymentService } from "../services/payment.service";

export const getAllSubscriptionPayment = createAsyncThunk(
  "payment/subscription/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await paymentService.getAllSubscriptionPayment();
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getOneSubscriptionPayment = createAsyncThunk(
  "payment/subscription/getOne",
  async (data, { rejectWithValue }) => {
    try {
      const response = await paymentService.getOneSubscriptionPayment(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getAllAppointmentPayment = createAsyncThunk(
  "payment/appointment/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await paymentService.getAllAppointmentPayment();
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getOneAppointmentPayment = createAsyncThunk(
  "payment/appointment/getOne",
  async (data, { rejectWithValue }) => {
    try {
      const response = await paymentService.getOneAppointmentPayment(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const initialState = {
  appointmentData: [],
  subscriptionData: [],
  appointmentSingleData: {},
  subscriptionSingleData: {},
  subscriptionLoading: false,
  appointmentLoading: false,
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
    [getAllSubscriptionPayment.pending]: (state) => {
      if (state.subscriptionData.length <= 0) {
        state.subscriptionLoading = true;
      }
    },
    [getAllSubscriptionPayment.fulfilled]: (state, action) => {
      state.error = false;
      state.subscriptionData = action.payload;
      state.subscriptionLoading = false;
    },
    [getAllSubscriptionPayment.rejected]: (state, action) => {
      state.error = true;
      state.message = action.payload;
      state.subscriptionLoading = false;
    },

    [getOneSubscriptionPayment.pending]: (state) => {
      state.subscriptionLoading = true;
    },
    [getOneSubscriptionPayment.fulfilled]: (state, { payload }) => {
      state.message = payload?.message;
      state.subscriptionLoading = false;
      state.subscriptionSingleData = payload.data;
    },
    [getOneSubscriptionPayment.rejected]: (state, { payload }) => {
      state.error = true;
      state.message = payload;
      state.subscriptionLoading = false;
    },

    [getAllAppointmentPayment.pending]: (state) => {
      if (state.appointmentData.length <= 0) {
        state.appointmentLoading = true;
      }
    },
    [getAllAppointmentPayment.fulfilled]: (state, action) => {
      state.error = false;
      state.appointmentData = action.payload;
      state.appointmentLoading = false;
    },
    [getAllAppointmentPayment.rejected]: (state, action) => {
      state.error = true;
      state.message = action.payload;
      state.appointmentLoading = false;
    },

    [getOneAppointmentPayment.pending]: (state) => {
      state.appointmentLoading = true;
    },
    [getOneAppointmentPayment.fulfilled]: (state, { payload }) => {
      state.message = payload?.message;
      state.appointmentLoading = false;
      state.appointmentSingleData = payload.data;
    },
    [getOneAppointmentPayment.rejected]: (state, { payload }) => {
      state.error = true;
      state.message = payload;
      state.appointmentLoading = false;
    },
  },
});

export const action = slice.actions;
export default slice.reducer;
