import axios from "axios";
import axiosInstance from "../../helpers/axios";
import { api } from "../../UrlConfig";
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

export const getSingleDoctor = id => {
  return async dispatch => {
    try {
      const res = await axiosInstance.get(`users/doctor/${id}`);
      console.log(res);
      dispatch({
        type: usersConstants.GET_SINGLE_DOCTOR_SUCCESS,
        payload: res.data.data,
      });
    } catch (e) {
      dispatch({
        type: usersConstants.GET_SINGLE_DOCTOR_FAIL,
        payload: e.response.data.message,
      });
      dispatch(showAlert(e.response.data.message, "danger"));
      dispatch(removeAlert());
    }
  };
};
export const updateSingleDoctor = (data, id) => {
  return async dispatch => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(`${api}users/doctor/${id}`, data, {
        headers: {
          Authorization: token && `Bearer ${token}`,
        },
      });
      console.log(res);
      dispatch({
        type: usersConstants.UPDATE_SINGLE_DOCTOR_SUCCESS,
      });
    } catch (e) {
      dispatch({
        type: usersConstants.UPDATE_SINGLE_DOCTOR_FAIL,
        payload: e.response.data.message,
      });
      dispatch(showAlert(e.response.data.message, "danger"));
      dispatch(removeAlert());
    }
  };
};
