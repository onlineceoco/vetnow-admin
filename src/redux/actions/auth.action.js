import axiosInstance from "../../helpers/axios";
import { removeAlert, showAlert } from "./alert.action";
import { authConstants } from "./constatns";

export const singinupLogin = phone => {
  return async dispatch => {
    try {
      const res = await axiosInstance.post("users/signup-login", { phone });
      dispatch({
        type: authConstants.SIGNUP_LOGIN_SUCCESS,
        payload: res.data.user,
      });
    } catch (e) {
      dispatch({
        type: authConstants.SIGNUP_LOGIN_FAIL,
        payload: e.response.data.message,
      });
      dispatch(showAlert(e.response.data.message, "danger"));
      dispatch(removeAlert());
    }
  };
};

export const loginConfirm = (password, phone) => {
  return async dispatch => {
    try {
      const res = await axiosInstance.post(`users/login-confirm/${phone}`, {
        password,
      });
      const { data } = res.data;
      localStorage.setItem("token", data.token);
      dispatch({
        type: authConstants.LOGIN_CONFIRM_SUCCESS,
        payload: data,
      });
    } catch (e) {
      dispatch({ type: authConstants.LOGIN_CONFIRM_FAIL });
      dispatch(showAlert(e.response.data.message, "danger"));
      dispatch(removeAlert());
    }
  };
};

export const logout = () => {
  return async dispatch => {
    try {
      dispatch({
        type: authConstants.LOGOUT_SUCCESS,
      });
    } catch (e) {
      dispatch({ type: authConstants.LOGOUT_FAIL });
    }
  };
};

export const isUserLoggedIn = () => {
  return async dispatch => {
    try {
      const res = await axiosInstance.get("users");

      dispatch({
        type: authConstants.LOGIN_CONFIRM_SUCCESS,
        payload: res.data,
      });
    } catch (e) {
      dispatch({ type: authConstants.LOGIN_CONFIRM_FAIL });
    }
  };
};

export const resetPaswword = phone => {
  return async dispatch => {
    try {
      const res = await axiosInstance.post(`users/signup-login?phone=${phone}`);
      console.log(res);

      dispatch({
        type: authConstants.SIGNUP_LOGIN_SUCCESS,
        payload: res.data,
      });
    } catch (e) {
      dispatch({ type: authConstants.SIGNUP_LOGIN_FAIL });
    }
  };
};

// export const logout = () => {
//   return async dispatch => {
//     try {
//       const res = await axiosInstance.get("users/logout");
//       console.log(res);
//       dispatch({
//         type: authConstants.LOGOUT_SUCCESS,
//       });
//     } catch (e) {
//       dispatch({ type: authConstants.LOGOUT_FAIL });
//     }
//   };
// };
