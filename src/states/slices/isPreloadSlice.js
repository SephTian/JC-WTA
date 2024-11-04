import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../data/api';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { asyncSetAuthUser } from '../authUser/action';

const initialState = true;

//POKOKNYA DISINI CUMA BOLEH MASUKIN KE STATE ATAU LOGIKA TANPA ASYNC JGN MASUKIN CONSOLE ERROR
const isPreloadSlice = createSlice({
  name: 'isPreload',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(asyncPreloadProcess.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(asyncPreloadProcess.rejected, () => {
        return false;
      });
  },
});

const asyncPreloadProcess = createAsyncThunk('isPreload/asyncPreloadProcess', async (params, thunkAPI) => {
  thunkAPI.dispatch(showLoading());
  try {
    const user = await api.getOwnProfile();
    thunkAPI.dispatch(asyncSetAuthUser({ authUser: user }));

    return false;
  } catch (error) {
    if (!error.response) {
      throw error;
    }

    return thunkAPI.rejectWithValue({ error: error.response.data });
  } finally {
    thunkAPI.dispatch(hideLoading());
  }
});

const isPreloadReducer = isPreloadSlice.reducer;

export default isPreloadReducer;
export { asyncPreloadProcess };
