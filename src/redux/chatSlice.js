import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { chatService } from "../services/chat.service";

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (data, { rejectWithValue }) => {
    try {
      const response = await chatService.sendMessage(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getChatByUser = createAsyncThunk(
  "chat/getChatByUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await chatService.getChatByUser(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getOneChat = createAsyncThunk(
  "chat/getOneChat",
  async (data, { rejectWithValue }) => {
    try {
      const response = await chatService.getOneChat(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const deleteChat = createAsyncThunk(
  "chat/deleteChat",
  async (data, { rejectWithValue }) => {
    try {
      const response = await chatService.deleteChat(data);
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
  name: "chat",
  initialState,
  reducers: {
    checkAll: (state) => {
      state.isChecked = !state.isChecked;
    },
  },
  extraReducers: {
    [getChatByUser.pending]: (state) => {
      if (state.data.length <= 0) {
        state.loading = true;
      }
    },
    [getChatByUser.fulfilled]: (state, action) => {
      state.error = false;
      state.data = action.payload;
      state.loading = false;
    },
    [getChatByUser.rejected]: (state, action) => {
      state.error = true;
      state.message = action.payload;
      state.loading = false;
    },

    [getOneChat.pending]: (state) => {
      state.loading = true;
    },
    [getOneChat.fulfilled]: (state, { payload }) => {
      state.message = payload?.message;
      state.loading = false;
      state.singleData = payload.data;
    },
    [getOneChat.rejected]: (state, { payload }) => {
      state.error = true;
      state.message = payload;
      state.loading = false;
    },

    [sendMessage.fulfilled]: (state, { payload }) => {
      state.message = payload?.message;
    },
    [sendMessage.rejected]: (state, { payload }) => {
      state.error = true;
      state.message = payload;
    },
    [deleteChat.fulfilled]: (state, { payload }) => {
      state.message = payload?.message;
    },
    [deleteChat.rejected]: (state, { payload }) => {
      state.error = true;
      state.message = payload;
    },
  },
});

export const action = slice.actions;
export default slice.reducer;
