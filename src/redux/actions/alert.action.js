import { alertConstants } from "./constatns";

export const showAlert = (error, kind) => {
  return async dispatch => {
    dispatch({
      type: alertConstants.ALERT_SET,
      payload: { error, kind },
    });
  };
};

export const removeAlert = () => {
  return async dispatch => {
    setTimeout(() => {
      dispatch({ type: alertConstants.ALERT_REMOVE });
    }, 4000);
  };
};
