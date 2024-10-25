import { configureStore } from '@reduxjs/toolkit';
import isPreloadReducer from './slices/isPreloadSlice';
//import { authUserReducer } from './slices/authUserSlice';
import authUserReducer from './authUser/reducer';
import threadsReducer from './slices/threadsSlice';
import detailThreadReducer from './slices/detailThreadSlice';
import usersReducer from './slices/usersSlice';
import leaderboardsReducer from './leaderboards/reducer';
import { loadingBarReducer } from 'react-redux-loading-bar';
export const store = configureStore({
  reducer: {
    isPreload: isPreloadReducer,
    authUser: authUserReducer,
    threads: threadsReducer,
    detailThread: detailThreadReducer,
    users: usersReducer,
    leaderboards: leaderboardsReducer,
    loadingBar: loadingBarReducer,
  },
});
