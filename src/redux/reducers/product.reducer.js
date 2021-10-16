import { alertConstants, productConstants } from "../actions/constatns";

const initialState = {
  products: [],
  loading: true,
  errors: null,
  singelProduct: null,
  done: null,
  progress: 0,
};

const productReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case productConstants.GET_ALL_PRODUCTS_SUCCESS:
      return (state = {
        ...state,
        products: payload,
        loading: false,
        done: null,
      });
    case productConstants.GET_ALL_PRODUCTS_FAIL:
      return (state = {
        ...state,
        products: null,
        errors: payload,
        loading: false,
      });
    case productConstants.CREATE_PRODUCT_SUCCESS:
      return (state = {
        ...state,
        loading: false,
        errors: null,
        done: true,
        progress: 0,
      });
    case productConstants.CREATE_PRODUCT_FAIL:
      return (state = {
        ...state,
        errors: payload,
        loading: false,
        done: false,
        progress: 0,
      });
    case productConstants.UPDATE_PRODUCT_SUCCESS:
      return (state = {
        ...state,
        errors: null,
        loading: false,
        done: true,
      });
    case productConstants.UPDATE_PRODUCT_FAIL:
      return (state = {
        ...state,
        errors: payload,
        loading: false,
        done: false,
      });
    case productConstants.GET_SINGLE_PRODUCT_SUCCESS:
      return (state = {
        ...state,
        errors: null,
        singelProduct: payload,
        loading: false,
      });
    case productConstants.GET_SINGLE_PRODUCT_FAIL:
      return (state = {
        ...state,
        errors: payload,
        loading: false,
        singelProduct: null,
      });
    case productConstants.DELETE_SINGEL_PRODUCT_SUCCESS:
      return (state = {
        ...state,
        loading: false,
        errors: null,
        done: true,
      });
    case productConstants.DELETE_SINGEL_PRODUCT_FAIL:
      return (state = {
        ...state,
        loading: false,
        errors: payload,
        done: false,
      });

    case alertConstants.ALERT_REMOVE:
      return (state = {
        ...state,
        errors: null,
        loading: false,
      });

    case productConstants.PRGORESS_BAR:
      return (state = {
        ...state,
        progress: payload,
      });

    default:
      return state;
  }
};

export default productReducer;
