import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../data/api';
import { asyncGetAllUsers } from './usersSlice';
import { toggleVoteCommentHelper, toggleVoteThreadHelper } from '../helper';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

const initialState = {
  detailThread: null,
  status: 'idle', // idle | loading | success | error
  error: null,
  statusVote: 'idle',
  errorVote: null,
  statusAddComment: 'idle', // idle | loading | success | error
  errorAddComment: null,
  statusVoteComment: 'idle',
  errorVoteComment: null,
};

const detailThreadSlice = createSlice({
  name: 'detailThread',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(asyncGetDetailThread.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(asyncGetDetailThread.fulfilled, (state, action) => {
        const payload = action.payload;

        state.detailThread = payload.detailThread;
        state.status = 'success';
        state.error = null;
      })
      .addCase(asyncGetDetailThread.rejected, (state, action) => {
        const payload = action.payload;
        state.status = 'error';
        state.error = payload ? payload.error.message : action.error.message;
      })
      .addCase(asyncToggleVoteDetailThread.pending, (state, action) => {
        const { userId, type } = action.meta.arg;
        state.detailThread = toggleVoteThreadHelper({ userId, thread: state.detailThread, type });
        state.statusVote = 'loading';
        state.errorVote = null;
      })
      .addCase(asyncToggleVoteDetailThread.fulfilled, (state, action) => {
        const payload = action.payload;
        state.detailThread = toggleVoteThreadHelper({ userId: payload.userId, thread: state.detailThread, type: payload.type });
        state.statusVote = 'success';
        state.errorVote = null;
      })
      .addCase(asyncToggleVoteDetailThread.rejected, (state, action) => {
        const payload = action.payload;
        state.detailThread = toggleVoteThreadHelper({ userId: payload.userId, thread: state.detailThread, type: payload.type });
        state.statusVote = 'error';
        state.errorVote = payload ? payload.error.message : action.error.message;
      })
      .addCase(asyncCreateComment.pending, (state) => {
        state.statusAddComment = 'loading';
        state.errorAddComment = null;
      })
      .addCase(asyncCreateComment.fulfilled, (state, action) => {
        const payload = action.payload;
        state.detailThread.comments = [payload.comment, ...state.detailThread.comments];
        state.statusAddComment = 'success';
        state.errorAddComment = null;
      })
      .addCase(asyncCreateComment.rejected, (state, action) => {
        const payload = action.payload;
        state.statusAddComment = 'error';
        state.errorAddComment = payload ? payload.error.message : action.error.message;
      })
      .addCase(asyncToggleVoteComment.pending, (state, action) => {
        const { userId, commentId, type } = action.meta.arg;
        state.detailThread.comments = state.detailThread.comments.map((comment) => {
          if (comment.id === commentId) {
            return toggleVoteCommentHelper({ userId, comment, type });
          }
          return comment;
        });
        state.statusVoteComment = 'loading';
        state.errorVoteComment = null;
      })
      .addCase(asyncToggleVoteComment.fulfilled, (state, action) => {
        const payload = action.payload;
        state.detailThread.comments = state.detailThread.comments.map((comment) => {
          if (comment.id === payload.commentId) {
            return toggleVoteCommentHelper({ userId: payload.userId, comment, type: payload.type });
          }
          return comment;
        });
        state.statusVoteComment = 'success';
        state.errorVoteComment = null;
      })
      .addCase(asyncToggleVoteComment.rejected, (state, action) => {
        const payload = action.payload;
        state.detailThread.comments = state.detailThread.comments.map((comment) => {
          if (comment.id === payload.commentId) {
            return toggleVoteCommentHelper({ userId: payload.userId, comment, type: payload.type });
          }
          return comment;
        });
        state.statusVote = 'error';
        state.errorVote = payload ? payload.error.message : action.error.message;
      });
  },
});

const asyncGetDetailThread = createAsyncThunk('detailThread/asyncGetDetailThread', async (threadId, thunkAPI) => {
  thunkAPI.dispatch(showLoading());
  try {
    const detailThread = await api.getDetailThread(threadId);
    await thunkAPI.dispatch(asyncGetAllUsers());
    return { detailThread };
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return thunkAPI.rejectWithValue({ error: error.response.data });
  } finally {
    thunkAPI.dispatch(hideLoading());
  }
});
const asyncToggleVoteDetailThread = createAsyncThunk('detailThread/asyncToggleVoteDetailThread', async ({ userId, threadId, type }, thunkAPI) => {
  thunkAPI.dispatch(showLoading());
  const { detailThread } = thunkAPI.getState().detailThread;
  try {
    if (type === 'up') {
      await api.upVoteThread(threadId);
    } else if (type === 'down') {
      await api.downVoteThread(threadId);
    } else if (type === 'neutral') {
      await api.neutralVoteThread(threadId);
    }

    return { userId, type };
  } catch (error) {
    const prevVoteType = {
      up: detailThread.upVotesBy.includes(userId),
      down: detailThread.downVotesBy.includes(userId),
    };

    let type = 'neutral';
    if (prevVoteType.up) {
      type = 'up';
    } else if (prevVoteType.down) {
      type = 'down';
    }

    if (!error.response) {
      throw error;
    }

    return thunkAPI.rejectWithValue({ userId, type, error: error.response.data });
  } finally {
    thunkAPI.dispatch(hideLoading());
  }
});

const asyncCreateComment = createAsyncThunk('detailThread/asyncCreateComment', async ({ threadId, content }, thunkAPI) => {
  thunkAPI.dispatch(showLoading());
  try {
    const comment = await api.createComment({ threadId, content });
    return { comment };
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return thunkAPI.rejectWithValue({ error: error.response.data });
  } finally {
    thunkAPI.dispatch(hideLoading());
  }
});

const asyncToggleVoteComment = createAsyncThunk('detailThread/asyncToggleVoteComment', async ({ userId, threadId, commentId, type }, thunkAPI) => {
  thunkAPI.dispatch(showLoading());
  const {
    detailThread: { comments },
  } = thunkAPI.getState().detailThread;

  try {
    if (type === 'up') {
      await api.upVoteComment({ threadId, commentId });
    } else if (type === 'down') {
      await api.downVoteComment({ threadId, commentId });
    } else if (type === 'neutral') {
      await api.neutralVoteComment({ threadId, commentId });
    }

    return { userId, commentId, type };
  } catch (error) {
    const selectedPrevComment = comments.find((comment) => comment.id === commentId);
    const prevVoteType = {
      up: selectedPrevComment.upVotesBy.includes(userId),
      down: selectedPrevComment.downVotesBy.includes(userId),
    };

    let type = 'neutral';
    if (prevVoteType.up) {
      type = 'up';
    } else if (prevVoteType.down) {
      type = 'down';
    }

    if (!error.response) {
      throw error;
    }

    return thunkAPI.rejectWithValue({ userId, commentId, type, error: error.response });
  } finally {
    thunkAPI.dispatch(hideLoading());
  }
});

const detailThreadReducer = detailThreadSlice.reducer;

export default detailThreadReducer;
export { asyncGetDetailThread, asyncToggleVoteDetailThread, asyncCreateComment, asyncToggleVoteComment };
