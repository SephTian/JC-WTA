/**
 * skenario test
 *
 * - asyncLoginUser thunk
 *  - should dispatch action correctly when login is success
 *  - should dispatch action and dispatch data with error message when login is failed
 *  - should dispatch action and dispatch data with error message from API response when login is failed
 *
 * - asyncRegisterUser thunk
 *  - should dispatch action correctly when register is success
 *  - should dispatch action and dispatch data with error message when register is failed
 */

import { describe, beforeEach, afterEach, it, vi, expect } from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../data/api';
import { loginUserActionCreator, registerUserActionCreator, asyncLoginUser, asyncRegisterUser } from './action';

const fakeLoginResponse = [
  {
    id: 'john_doe',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://generated-image-url.jpg',
  },
];

const fakeToken = 'AsdaskSAAKSOsd2321oiaspWIAdiosa';

const fakeErrorResponse = new Error('api anda error yahayuk');
const fakeErrorWithResponseFromAPI = {
  response: {
    data: {
      message: 'error bro',
    },
  },
};

describe('asyncLoginUser thunk', () => {
  beforeEach(() => {
    api._login = api.login;
    api._getOwnProfile = api.getOwnProfile;
    api._putToken = api.putToken;
  });

  afterEach(() => {
    api._login = api.login;
    api._getOwnProfile = api.getOwnProfile;
    api._putToken = api.putToken;

    // delete backup data
    delete api._login;
    delete api._getOwnProfile;
    delete api._putToken;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.login = () => Promise.resolve(fakeToken);
    api.putToken = vi.fn();
    api.getOwnProfile = () => Promise.resolve(fakeLoginResponse);

    // mock dispatch
    const dispatch = vi.fn();
    // action
    await asyncLoginUser({ email: 'gi@joe.id', password: 'hayolooo' })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(loginUserActionCreator({ authUser: null, statusLogin: 'loading', errorLogin: null }));
    expect(dispatch).toHaveBeenCalledWith(loginUserActionCreator({ authUser: fakeLoginResponse, statusLogin: 'success', errorLogin: null }));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and dispatch data with error message when login is failed', async () => {
    // arrange
    // stub implementation
    api.login = () => Promise.reject(fakeErrorResponse);
    api.putToken = vi.fn();
    api.getOwnProfile = () => Promise.reject(fakeErrorResponse);

    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncLoginUser({ email: 'gi@joe.id', password: 'hayolooo' })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(loginUserActionCreator({ authUser: null, statusLogin: 'loading', errorLogin: null }));
    expect(dispatch).toHaveBeenCalledWith(loginUserActionCreator({ authUser: null, statusLogin: 'error', errorLogin: fakeErrorResponse.message }));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
  it('should dispatch action and dispatch data with error message from api response when login is failed', async () => {
    // arrange
    // stub implementation: simulating axios error response
    api.login = () => Promise.reject(fakeErrorWithResponseFromAPI);

    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncLoginUser({ email: 'gi@joe.id', password: 'hayolooo' })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      loginUserActionCreator({
        authUser: null,
        statusLogin: 'loading',
        errorLogin: null,
      })
    );
    expect(dispatch).toHaveBeenCalledWith(
      loginUserActionCreator({
        authUser: null,
        statusLogin: 'error',
        errorLogin: 'error bro',
      })
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});

describe('asyncRegisterUser thunk', () => {
  beforeEach(() => {
    api._register = api.register;
  });

  afterEach(() => {
    api._register = api.register;

    // delete backup data
    delete api._register;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.register = () => Promise.resolve();

    // mock dispatch
    const dispatch = vi.fn();
    // action
    await asyncRegisterUser({ name: 'halo nama saya itu', email: 'gi@joe.id', password: 'hayolooo' })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(registerUserActionCreator({ statusRegister: 'loading', errorRegister: null }));
    expect(dispatch).toHaveBeenCalledWith(registerUserActionCreator({ statusRegister: 'success', errorRegister: null }));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and dispatch data with error message when login is failed', async () => {
    // arrange
    // stub implementation
    api.register = () => Promise.reject(fakeErrorResponse);

    // mock dispatch
    const dispatch = vi.fn();
    // action
    await asyncRegisterUser({ name: 'halo nama saya itu', email: 'gi@joe.id', password: 'hayolooo' })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(registerUserActionCreator({ statusRegister: 'loading', errorRegister: null }));
    expect(dispatch).toHaveBeenCalledWith(registerUserActionCreator({ statusRegister: 'error', errorRegister: fakeErrorResponse.message }));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and dispatch data with error message from api response when login is failed', async () => {
    // arrange
    // stub implementation
    api.register = () => Promise.reject(fakeErrorWithResponseFromAPI);

    // mock dispatch
    const dispatch = vi.fn();
    // action
    await asyncRegisterUser({ name: 'halo nama saya itu', email: 'gi@joe.id', password: 'hayolooo' })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(registerUserActionCreator({ statusRegister: 'loading', errorRegister: null }));
    expect(dispatch).toHaveBeenCalledWith(registerUserActionCreator({ statusRegister: 'error', errorRegister: 'error bro' }));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
