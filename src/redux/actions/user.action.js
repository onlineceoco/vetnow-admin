import axiosInstance from "../../helpers/axios";
import { removeAlert, showAlert } from "./alert.action";
import { usersConstants } from "./constatns";

export const getAllUsers = page => {
  return async dispatch => {
    try {
      const res = await axiosInstance.get(`users/get-users?page=${page || 1}`);
      dispatch({
        type: usersConstants.GET_ALL_USERS_SUCCESS,
        payload: res.data.data,
      });
    } catch (e) {
      dispatch({
        type: usersConstants.GET_ALL_USERS_FAIL,
        payload: e.response.data.message,
      });
      dispatch(showAlert(e.response.data.message, "danger"));
      dispatch(removeAlert());
    }
  };
};
