import { ActionType } from './action';

function leaderboardsReducer(
  leaderboards = {
    leaderboards: [],
    status: 'idle', // idle | loading | success | error
    error: null,
  },
  action = {}
) {
  switch (action.type) {
    case ActionType.GET_LEADERBOARDS:
      return {
        ...leaderboards,
        leaderboards: action.payload.leaderboards,
        status: action.payload.status,
        error: action.payload.error,
      };
    default:
      return leaderboards;
  }
}

export default leaderboardsReducer;
