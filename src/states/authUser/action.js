import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../data/api';

const ActionType = {
  SET_DEFAULT_LOGIN_STATUS: 'SET_DEFAULT_LOGIN_STATUS',
  LOGIN_USER: 'LOGIN_USER',
  SET_DEFAULT_REGISTER_STATUS: 'SET_DEFAULT_REGISTER_STATUS',
  REGISTER_USER: 'REGISTER_USER',
  SET_AUTH_USER: 'SET_AUTH_USER',
  UNSET_AUTH_USER: 'UNSET_AUTH_USER',
};

function unsetAuthUserActionCreator() {
  return {
    type: ActionType.UNSET_AUTH_USER,
    payload: {
      authUser: null,
    },
  };
}

function setAuthUserActionCreator({ authUser }) {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser: authUser,
    },
  };
}

function loginUserActionCreator({ authUser, statusLogin, errorLogin }) {
  return {
    type: ActionType.LOGIN_USER,
    payload: {
      authUser,
      statusLogin,
      errorLogin,
    },
  };
}

function registerUserActionCreator({ statusRegister, errorRegister }) {
  return {
    type: ActionType.REGISTER_USER,
    payload: {
      statusRegister,
      errorRegister,
    },
  };
}

function setDefaultRegisterStatusActionCreator() {
  return {
    type: ActionType.SET_DEFAULT_REGISTER_STATUS,
    payload: {
      statusRegister: 'idle',
      errorRegister: null,
    },
  };
}

function setDefaultLoginStatusActionCreator() {
  return {
    type: ActionType.SET_DEFAULT_LOGIN_STATUS,
    payload: {
      statusLogin: 'idle',
      errorLogin: null,
    },
  };
}

//===========================================

function asyncUnsetAuthUser() {
  return (dispatch) => {
    dispatch(unsetAuthUserActionCreator());
    api.putToken('');
  };
}

function asyncSetAuthUser({ authUser }) {
  return (dispatch) => {
    dispatch(setAuthUserActionCreator({ authUser }));
  };
}

function asyncLoginUser({ email, password }) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(loginUserActionCreator({ authUser: null, statusLogin: 'loading', errorLogin: null }));
    try {
      const token = await api.login({ email, password });
      api.putToken(token);

      const authUser = await api.getOwnProfile();
      dispatch(loginUserActionCreator({ authUser, statusLogin: 'success', errorLogin: null }));
    } catch (error) {
      //ini jika ada error lain yang tidak berhubungan dengan api
      if (!error.response) {
        dispatch(loginUserActionCreator({ authUser: null, statusLogin: 'error', errorLogin: error.message }));
      } else {
        dispatch(loginUserActionCreator({ authUser: null, statusLogin: 'error', errorLogin: error.response.data.message }));
      }
    }

    dispatch(hideLoading());
  };
}

function asyncRegisterUser({ name, email, password }) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(
      registerUserActionCreator({
        statusRegister: 'loading',
        errorRegister: null,
      })
    );

    try {
      await api.register({ name, email, password });
      dispatch(
        registerUserActionCreator({
          statusRegister: 'success',
          errorRegister: null,
        })
      );
    } catch (error) {
      //ini jika ada error lain yang tidak berhubungan dengan api
      if (!error.response) {
        dispatch(
          registerUserActionCreator({
            statusRegister: 'error',
            errorRegister: error.message,
          })
        );
      } else {
        dispatch(
          registerUserActionCreator({
            statusRegister: 'error',
            errorRegister: error.response.data.message,
          })
        );
      }
    }

    dispatch(hideLoading());
  };
}

function asyncSetDefaultRegisterStatus() {
  return (dispatch) => {
    dispatch(setDefaultRegisterStatusActionCreator());
  };
}

function asyncSetDefaultLoginStatus() {
  return (dispatch) => {
    dispatch(setDefaultLoginStatusActionCreator());
  };
}

export {
  ActionType,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  loginUserActionCreator,
  registerUserActionCreator,
  setDefaultLoginStatusActionCreator,
  setDefaultRegisterStatusActionCreator,
  asyncSetAuthUser,
  asyncSetDefaultLoginStatus,
  asyncLoginUser,
  asyncUnsetAuthUser,
  asyncSetDefaultRegisterStatus,
  asyncRegisterUser,
};
