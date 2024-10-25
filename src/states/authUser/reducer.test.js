/**
 * test scenario for authUserReducer
 *
 * - authUserReducers function
 *  - should return the initial state when given by unknown action
 *  - should return authUser data, statusLogin with value "success", and errorLogin with value null when given by LOGIN_USER action
 *  - should return statusLogin with value "idle" and errorLogin with value null when given by SET_DEFAULT_LOGIN_STATUS action
 *  - should return statusRegister with value "success" and errorRegister with value null when given by REGISTER_USER action
 *  - should return statusRegister with value "idle" and errorRegister with value null when given by SET_DEFAULT_REGISTER_STATUS action
 *  - should return authUser with value null when given by UNSET_AUTH_USER action
 */

import { describe, it, expect } from 'vitest';
import authUserReducer from './reducer';

describe('authUserReducers function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = {
      authUser: null,
      statusRegister: 'idle',
      errorRegister: null,
      statusLogin: 'idle',
      errorLogin: null,
    };
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return authUser data, statusLogin with value "success", and errorLogin with value null when given by LOGIN_USER action', () => {
    // arrange
    const initialState = {
      authUser: null,
      statusRegister: 'idle',
      errorRegister: null,
      statusLogin: 'idle',
      errorLogin: null,
    };
    const fakeAuthUserData = {
      id: 'john_doe',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg',
    };
    const action = {
      type: 'LOGIN_USER',
      payload: {
        authUser: fakeAuthUserData,
        statusLogin: 'success',
        errorLogin: null,
      },
    };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      authUser: fakeAuthUserData,
      statusLogin: 'success',
      errorLogin: null,
    });
  });

  it('should return statusLogin with value "idle" and errorLogin with value null when given by SET_DEFAULT_LOGIN_STATUS action', () => {
    // arrange
    const initialState = {
      authUser: null,
      statusRegister: 'idle',
      errorRegister: null,
      statusLogin: 'success',
      errorLogin: 'blablabla',
    };
    const action = {
      type: 'SET_DEFAULT_LOGIN_STATUS',
      payload: {
        statusLogin: 'idle',
        errorLogin: null,
      },
    };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toEqual({ ...initialState, statusLogin: 'idle', errorLogin: null });
  });

  it('should return statusRegister with value "success" and errorRegister with value null when given by REGISTER_USER action', () => {
    // arrange
    const initialState = {
      authUser: null,
      statusRegister: 'idle',
      errorRegister: null,
      statusLogin: 'idle',
      errorLogin: null,
    };
    const action = {
      type: 'REGISTER_USER',
      payload: {
        statusRegister: 'success',
        errorRegister: null,
      },
    };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toEqual({ ...initialState, statusRegister: 'success', errorRegister: null });
  });

  it('should return statusRegister with value "idle" and errorRegister with value null when given by SET_DEFAULT_REGISTER_STATUS action', () => {
    // arrange
    const initialState = {
      authUser: null,
      statusRegister: 'success',
      errorRegister: 'blablabla',
      statusLogin: 'idle',
      errorLogin: null,
    };
    const action = {
      type: 'SET_DEFAULT_REGISTER_STATUS',
      payload: {
        statusRegister: 'idle',
        errorRegister: null,
      },
    };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toEqual({ ...initialState, statusRegister: 'idle', errorRegister: null });
  });

  it('should return authUser with value null when given by UNSET_AUTH_USER action', () => {
    // arrange
    const initialState = {
      authUser: {
        id: 'john_doe',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://generated-image-url.jpg',
      },
      statusRegister: 'idle',
      errorRegister: null,
      statusLogin: 'idle',
      errorLogin: null,
    };
    const action = {
      type: 'UNSET_AUTH_USER',
      payload: {
        authUser: null,
      },
    };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toEqual({ ...initialState, authUser: null });
  });
});
