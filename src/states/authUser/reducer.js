import { ActionType } from './action';

function authUserReducer(
  authUser = {
    authUser: null,
    statusRegister: 'idle',
    errorRegister: null,
    statusLogin: 'idle',
    errorLogin: null,
  },
  action = {}
) {
  switch (action.type) {
    case ActionType.LOGIN_USER:
      return {
        ...authUser,
        authUser: action.payload.authUser,
        statusLogin: action.payload.statusLogin,
        errorLogin: action.payload.errorLogin,
      };
    case ActionType.SET_DEFAULT_LOGIN_STATUS:
      return {
        ...authUser,
        statusLogin: action.payload.statusLogin,
        errorLogin: action.payload.errorLogin,
      };
    case ActionType.REGISTER_USER:
      return {
        ...authUser,
        statusRegister: action.payload.statusRegister,
        errorRegister: action.payload.errorRegister,
      };
    case ActionType.SET_DEFAULT_REGISTER_STATUS:
      return {
        ...authUser,
        statusRegister: action.payload.statusRegister,
        errorRegister: action.payload.errorRegister,
      };
    case ActionType.UNSET_AUTH_USER:
      return {
        ...authUser,
        authUser: null,
      };
    case ActionType.SET_AUTH_USER:
      return {
        ...authUser,
        authUser: action.payload.authUser,
      };
    default:
      return authUser;
  }
}

export default authUserReducer;
