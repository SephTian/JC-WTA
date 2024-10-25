import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../data/api';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

const initialState = {
  leaderboards: [],
  status: 'idle', // idle | loading | success | error
  error: null,
};

const leaderboardsSlice = createSlice({
  name: 'leaderboards',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(asyncGetLeaderboards.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(asyncGetLeaderboards.fulfilled, (state, action) => {
        const payload = action.payload;
        state.status = 'success';
        state.leaderboards = payload.leaderboards;
        state.error = null;
      })
      .addCase(asyncGetLeaderboards.rejected, (state, action) => {
        const payload = action.payload;
        state.status = 'error';
        state.error = payload ? payload.error.message : action.error.message;
      });
  },
});

// Parameter func dalam creatAsyncThunk ==> ( param, thunkAPI )
const asyncGetLeaderboards = createAsyncThunk('leaderboards/asyncGetLeaderboards', async (_, thunkAPI) => {
  thunkAPI.dispatch(showLoading());
  try {
    const leaderboards = await api.getLeaderboards();
    return { leaderboards };
  } catch (error) {
    if (!error.response) {
      throw error;
    }

    return thunkAPI.rejectWithValue({ error: error.response.data });
  } finally {
    thunkAPI.dispatch(hideLoading());
  }
});

const leaderboardsReducer = leaderboardsSlice.reducer;

export default leaderboardsReducer;
export { asyncGetLeaderboards };
