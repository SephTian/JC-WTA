/**
 * test scenario for authUserReducer
 *
 * - authUserReducers function
 *  - should return the initial state when given by unknown action
 *  - should return authUser data, status with value "success", and error with value null when given by GET_LEADERBOARDS action
 */

import { describe, it, expect } from 'vitest';
import leaderboardsReducer from './reducer';

describe('authUserReducers function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = {
      leaderboards: [],
      status: 'idle',
      error: null,
    };
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = leaderboardsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return authUser data, status with value "success", and error with value null when given by GET_LEADERBOARDS action', () => {
    // arrange
    const initialState = {
      leaderboards: [],
      status: 'idle',
      error: null,
    };
    const fakeLeaderboards = [
      {
        user: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
        score: 10,
      },
    ];
    const action = {
      type: 'GET_LEADERBOARDS',
      payload: {
        leaderboards: fakeLeaderboards,
        status: 'success',
        error: null,
      },
    };

    // action
    const nextState = leaderboardsReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      leaderboards: fakeLeaderboards,
      status: 'success',
      error: null,
    });
  });
});
