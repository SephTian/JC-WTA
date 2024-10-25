import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../data/api';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

const initialState = {
  users: [],
  status: 'idle', // idle | loading | success | error
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(asyncGetAllUsers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(asyncGetAllUsers.fulfilled, (state, action) => {
        state.status = 'success';
        state.users = action.payload;
        state.error = null;
      })
      .addCase(asyncGetAllUsers.rejected, (state, action) => {
        const payload = action.payload;
        state.status = 'error';
        state.error = payload ? payload.error.message : action.error.message;
      });
  },
});

// Parameter func dalam creatAsyncThunk ==> ( param, thunkAPI )
const asyncGetAllUsers = createAsyncThunk('users/asyncGetAllUsers', async (_, thunkAPI) => {
  thunkAPI.dispatch(showLoading());
  try {
    const users = await api.getAllUsers();
    return users;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return thunkAPI.rejectWithValue({ error: error.response.data });
  } finally {
    thunkAPI.dispatch(hideLoading());
  }
});

const usersReducer = usersSlice.reducer;

export default usersReducer;
export { asyncGetAllUsers };
