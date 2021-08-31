import axiosInstance from "../../helpers/axios";
import { productConstants } from "./constatns";
import { removeAlert, showAlert } from "./alert.action";
import axios from "axios";

export const getAllProducts = () => {
  return async dispatch => {
    try {
      const res = await axiosInstance.get("products?sort&page=1&limit=100");
      dispatch({
        type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
        payload: res.data.data,
      });
    } catch (e) {
      dispatch({
        type: productConstants.GET_ALL_PRODUCTS_FAIL,
        payload: e.response.data.message,
      });
    }
  };
};

export const getSingelProduct = id => {
  return async dispatch => {
    try {
      if (!id) {
        return;
      }
      const res = await axiosInstance.get(`products/${id}`);
      dispatch({
        type: productConstants.GET_SINGLE_PRODUCT_SUCCESS,
        payload: res.data.data,
      });
    } catch (e) {
      dispatch({
        type: productConstants.GET_SINGLE_PRODUCT_FAIL,
        payload: e.response.data.message,
      });
    }
  };
};

export const createProduct = formData => {
  return async dispatch => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://api.vetnow.ir/api/v1/products",
        formData,
        {
          headers: {
            Authorization: token && `Bearer ${token}`,
          },
        },
      );
      dispatch({
        type: productConstants.CREATE_PRODUCT_SUCCESS,
        payload: res.data.data,
      });
    } catch (e) {
      dispatch({
        type: productConstants.CREATE_PRODUCT_FAIL,
        payload: e.response.data.message,
      });
      dispatch(showAlert(e.response.data.message, "danger"));
      dispatch(removeAlert());
    }
  };
};

export const updateProduct = (formData, id) => {
  return async dispatch => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://api.vetnow.ir/api/v1/products/${id}`,
        formData,
        {
          headers: {
            Authorization: token && `Bearer ${token}`,
          },
        },
      );
      dispatch({
        type: productConstants.UPDATE_PRODUCT_SUCCESS,
      });
    } catch (e) {
      dispatch({
        type: productConstants.UPDATE_PRODUCT_FAIL,
        payload: e.response.data.message,
      });
      dispatch(showAlert(e.response.data.message, "danger"));
      dispatch(removeAlert());
    }
  };
};

export const deleteProduct = id => {
  return async dispatch => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://api.vetnow.ir/api/v1/products/${id}`, {
        headers: {
          Authorization: token && `Bearer ${token}`,
        },
      });
      dispatch({
        type: productConstants.DELETE_SINGEL_PRODUCT_SUCCESS,
      });
    } catch (e) {
      dispatch({
        type: productConstants.DELETE_SINGEL_PRODUCT_FAIL,
        payload: e.response.data.message,
      });
      dispatch(showAlert(e.response.data.message, "danger"));
      dispatch(removeAlert());
    }
  };
};
