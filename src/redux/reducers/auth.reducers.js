import { authConstants } from "../actions/constatns";

const initialState = {
  token: null,
  user: null,
  isAuthenticated: false,
  loading: true,
  errors: null,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case authConstants.SIGNUP_LOGIN_SUCCESS:
      return (state = {
        ...state,
        user: payload,
        loading: false,
      });
    case authConstants.SIGNUP_LOGIN_FAIL:
      return (state = {
        ...state,
        errors: payload,
        loading: false,
      });
    case authConstants.LOGIN_CONFIRM_SUCCESS:
      return (state = {
        ...state,
        token: payload.token,
        user: payload.user,
        isAuthenticated: true,
        loading: false,
      });
    case authConstants.LOGIN_CONFIRM_FAIL:
      localStorage.removeItem("token");
      return (state = {
        ...initialState,
      });
    case authConstants.LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      return (state = {
        ...initialState,
      });
    case authConstants.LOGOUT_FAIL:
      return state;
    default:
      return state;
  }
};

export default authReducer;
