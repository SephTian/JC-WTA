import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../data/api';

const ActionType = {
  GET_LEADERBOARDS: 'GET_LEADERBOARDS',
};

function getLeaderboardsActionCreator({ leaderboards, status, error }) {
  return {
    type: ActionType.GET_LEADERBOARDS,
    payload: {
      leaderboards,
      status,
      error,
    },
  };
}
//===========================================

function asyncGetLeaderboards() {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(getLeaderboardsActionCreator({ leaderboards: [], status: 'loading', error: null }));

    try {
      const leaderboards = await api.getLeaderboards();
      dispatch(getLeaderboardsActionCreator({ leaderboards, status: 'success', error: null }));
    } catch (error) {
      if (!error.response) {
        dispatch(getLeaderboardsActionCreator({ leaderboards: [], status: 'error', error: error.message }));
      } else {
        dispatch(getLeaderboardsActionCreator({ leaderboards: [], status: 'error', error: error.response.data.message }));
      }
    }

    dispatch(hideLoading());
  };
}

export { ActionType, getLeaderboardsActionCreator, asyncGetLeaderboards };
