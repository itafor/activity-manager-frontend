import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { subscriptionService } from "../services/subscription.service";

export const createSubscription = createAsyncThunk(
  "subscription/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await subscriptionService.create(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const editSubscription = createAsyncThunk(
  "subscription/edit",
  async (data, { rejectWithValue }) => {
    try {
      const response = await subscriptionService.edit(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getAllSubscriptions = createAsyncThunk(
  "subscription/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await subscriptionService.getAll();
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getOneSubscription = createAsyncThunk(
  "subscription/getOne",
  async (data, { rejectWithValue }) => {
    try {
      const response = await subscriptionService.getOne(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const deleteSubscription = createAsyncThunk(
  "subscription/deleteOne",
  async (data, { rejectWithValue }) => {
    try {
      const response = await subscriptionService.deleteOne(data);
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
  name: "subscription",
  initialState,
  reducers: {
    checkAll: (state) => {
      state.isChecked = !state.isChecked;
    },
    getSingleData: (state, { payload }) => {
      state.singleData = payload;
    },
  },
  extraReducers: {
    [getAllSubscriptions.pending]: (state) => {
      if (state.data.length <= 0) {
        state.loading = true;
      }
    },
    [getAllSubscriptions.fulfilled]: (state, action) => {
      state.error = false;
      state.data = action.payload;
      state.loading = false;
    },
    [getAllSubscriptions.rejected]: (state, action) => {
      state.error = true;
      state.message = action.payload;
      state.loading = false;
    },

    [getOneSubscription.pending]: (state) => {
      state.loading = true;
    },
    [getOneSubscription.fulfilled]: (state, { payload }) => {
      state.message = payload?.message;
      state.loading = false;
      state.singleData = payload.data;
    },
    [getOneSubscription.rejected]: (state, { payload }) => {
      state.error = true;
      state.message = payload;
      state.loading = false;
    },

    [createSubscription.fulfilled]: (state, { payload }) => {
      state.message = payload?.message;
    },
    [createSubscription.rejected]: (state, { payload }) => {
      state.error = true;
      state.message = payload;
    },

    [editSubscription.fulfilled]: (state, { payload }) => {
      state.message = payload?.message;
    },
    [editSubscription.rejected]: (state, { payload }) => {
      state.error = true;
      state.message = payload;
    },

    [deleteSubscription.fulfilled]: (state, { payload }) => {
      state.message = payload?.message;
    },
    [deleteSubscription.rejected]: (state, { payload }) => {
      state.error = true;
      state.message = payload;
    },
  },
});

export const { getSingleData } = slice.actions;
export default slice.reducer;
