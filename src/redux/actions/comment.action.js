import axios from "axios";
import axiosInstance from "../../helpers/axios";
import { commentConstants } from "./constatns";

export const getComments = page => {
  return async dispatch => {
    try {
      const res = await axiosInstance.get(
        `comments/approved?page=${page || 1}`,
      );
      dispatch({
        type: commentConstants.GET_NOT_APPROVED_COMMENTS_SUCCESS,
        payload: res.data,
      });
    } catch (e) {
      dispatch({
        type: commentConstants.GET_NOT_APPROVED_COMMENTS_FAIL,
        payload: e.response,
      });
    }
  };
};

export const updateComment = id => {
  return async dispatch => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://api.vetnow.ir/api/v1/comments/${id}`,
        { approved: true },
        {
          headers: {
            Authorization: token && `Bearer ${token}`,
          },
        },
      );

      dispatch({
        type: commentConstants.UPDATE_NOT_APPROVED_COMMENTS_SUCCESS,
      });
    } catch (e) {
      dispatch({
        type: commentConstants.UPDATE_NOT_APPROVED_COMMENTS_FAIL,
        payload: e.response.data,
      });
    }
  };
};

export const deleteComment = id => {
  return async dispatch => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://api.vetnow.ir/api/v1/comments/${id}`, {
        headers: {
          Authorization: token && `Bearer ${token}`,
        },
      });
      dispatch({
        type: commentConstants.DELETE_COMMENT_SUCCESS,
      });
    } catch (e) {
      dispatch({
        type: commentConstants.DELETE_COMMENT_FAIL,
        payload: e.response.data,
      });
    }
  };
};
