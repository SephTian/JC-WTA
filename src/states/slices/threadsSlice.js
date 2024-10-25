import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../data/api';
import { asyncGetAllUsers } from './usersSlice';
import { toggleVoteThreadHelper } from '../helper';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

const initialState = {
  threads: [],
  status: 'idle', // idle | loading | success | error
  error: null,
  statusVote: 'idle', // idle | loading | success | error
  errorVote: null,
  statusCreateThread: 'idle', // idle | loading | success | error
  errorCreateThread: null,
};

const threadsSlice = createSlice({
  name: 'threads',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(asyncGetAllThreads.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(asyncGetAllThreads.fulfilled, (state, action) => {
        const payload = action.payload;
        state.status = 'success';
        state.threads = payload.threads;
        state.error = null;
      })
      .addCase(asyncGetAllThreads.rejected, (state, action) => {
        const payload = action.payload;
        state.status = 'error';
        state.threads = [];
        state.error = payload ? payload.error.message : action.error.message;
      })
      .addCase(asyncCreateThread.pending, (state) => {
        state.statusCreateThread = 'loading';
        state.errorCreateThread = null;
      })
      .addCase(asyncCreateThread.fulfilled, (state, action) => {
        const payload = action.payload;
        state.statusCreateThread = 'success';
        state.threads = [payload.thread, ...state.threads];
        state.errorCreateThread = null;
      })
      .addCase(asyncCreateThread.rejected, (state, action) => {
        const payload = action.payload;
        state.statusCreateThread = 'error';
        state.errorCreateThread = payload ? payload.error.message : action.error.message;
      })
      .addCase(asyncToggleVoteThread.pending, (state, action) => {
        const { userId, threadId, type } = action.meta.arg;
        state.threads = state.threads.map((thread) => {
          if (thread.id === threadId) {
            return toggleVoteThreadHelper({ userId, thread, type });
          }
          return thread;
        });
        state.statusVote = 'loading';
        state.errorVote = null;
      })
      .addCase(asyncToggleVoteThread.fulfilled, (state, action) => {
        const payload = action.payload;

        state.threads = state.threads.map((thread) => {
          if (thread.id === payload.threadId) {
            return toggleVoteThreadHelper({ userId: payload.userId, thread, type: payload.type });
          }
          return thread;
        });

        state.statusVote = 'success';
        state.errorVote = null;
      })
      .addCase(asyncToggleVoteThread.rejected, (state, action) => {
        const payload = action.payload;
        state.threads = state.threads.map((thread) => {
          if (thread.id === payload.threadId) {
            return toggleVoteThreadHelper({ userId: payload.userId, thread, type: payload.type });
          }
          return thread;
        });

        state.statusVote = 'error';
        state.errorVote = payload ? payload.error.message : action.error.message;
      });
  },
});

const asyncGetAllThreads = createAsyncThunk('threads/asyncGetAllThreads', async (_, thunkAPI) => {
  thunkAPI.dispatch(showLoading());
  try {
    await thunkAPI.dispatch(asyncGetAllUsers());
    const threads = await api.getAllThreads();
    return { threads };
  } catch (error) {
    if (!error.response) {
      throw error;
    }

    return thunkAPI.rejectWithValue({ error: error.response.data });
  } finally {
    thunkAPI.dispatch(hideLoading());
  }
});

const asyncCreateThread = createAsyncThunk('threads/asyncCreateThread', async ({ title, body, category }, thunkAPI) => {
  thunkAPI.dispatch(showLoading());
  try {
    const thread = await api.createThread({ title, body, category });
    return { thread };
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return thunkAPI.rejectWithValue({ error: error.response.data });
  } finally {
    thunkAPI.dispatch(hideLoading());
  }
});

const asyncToggleVoteThread = createAsyncThunk('threads/asyncToggleVoteThread', async ({ userId, threadId, type }, thunkAPI) => {
  thunkAPI.dispatch(showLoading());
  const { threads } = thunkAPI.getState().threads;

  try {
    if (type === 'up') {
      await api.upVoteThread(threadId);
    } else if (type === 'down') {
      await api.downVoteThread(threadId);
    } else if (type === 'neutral') {
      await api.neutralVoteThread(threadId);
    }
    return { userId, threadId, type };
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    //Proses mencari status vote dari thread sebelumnya agar bisa di revert
    const selectedPrevThread = threads.find((thread) => thread.id === threadId);
    const prevVoteType = {
      up: selectedPrevThread.upVotesBy.includes(userId),
      down: selectedPrevThread.downVotesBy.includes(userId),
    };

    let type = 'neutral';
    if (prevVoteType.up) {
      type = 'up';
    } else if (prevVoteType.down) {
      type = 'down';
    }

    return thunkAPI.rejectWithValue({ userId, threadId, type, error: error.response.data });
  } finally {
    thunkAPI.dispatch(hideLoading());
  }
});

const threadsReducer = threadsSlice.reducer;

export default threadsReducer;
export { asyncGetAllThreads, asyncToggleVoteThread, asyncCreateThread };
