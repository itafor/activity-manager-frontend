import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { physicianService } from '../services/physician.service'

export const getAllPhysician = createAsyncThunk(
  'physician/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await physicianService.getAll()
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const getTopPhysician = createAsyncThunk(
  'physician/getTop',
  async (_, { rejectWithValue }) => {
    try {
      const response = await physicianService.getTop()
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const getOnePhysician = createAsyncThunk(
  'physician/getOne',
  async (data, { rejectWithValue }) => {
    try {
      const response = await physicianService.getOne(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const searchPhysician = createAsyncThunk(
  'physician/search',
  async (data, { rejectWithValue }) => {
    try {
      const response = await physicianService.getOne(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

const initialState = {
  data: [],
  topData: [],
  searchData: [],
  searchLoading: false,
  topLoading: false,
  singleData: {},
  loading: false,
  error: false,
  message: '',
}

const slice = createSlice({
  name: 'patient',
  initialState,
  reducers: {
    checkAll: (state) => {
      state.isChecked = !state.isChecked
    },
    resetSelectedPhysician: (state) => {
      state.singleData = {}
    },
  },
  extraReducers: {
    [getAllPhysician.pending]: (state) => {
      if (state.data.length <= 0) {
        state.loading = true
      }
    },
    [getAllPhysician.fulfilled]: (state, action) => {
      state.error = false
      state.data = action.payload
      state.loading = false
    },
    [getAllPhysician.rejected]: (state, action) => {
      state.error = true
      state.message = action.payload
      state.loading = false
    },

    [getTopPhysician.pending]: (state) => {
      if (state.topData.length <= 0) {
        state.topLoading = true
      }
    },
    [getTopPhysician.fulfilled]: (state, action) => {
      state.error = false
      state.topData = action.payload
      state.topLoading = false
    },
    [getTopPhysician.rejected]: (state, action) => {
      state.error = true
      state.message = action.payload
      state.topLoading = false
    },

    [searchPhysician.pending]: (state) => {
      if (state.searchData.length <= 0) {
        state.searchLoading = true
      }
    },
    [searchPhysician.fulfilled]: (state, action) => {
      state.error = false
      state.searchData = action.payload
      state.searchLoading = false
    },
    [searchPhysician.rejected]: (state, action) => {
      state.error = true
      state.message = action.payload
      state.searchLoading = false
    },

    [getOnePhysician.pending]: (state) => {
      state.loading = true
    },
    [getOnePhysician.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
      state.singleData = payload
    },
    [getOnePhysician.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },
  },
})

export const { resetSelectedPhysician } = slice.actions
export default slice.reducer
