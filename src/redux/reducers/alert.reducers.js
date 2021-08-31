import { alertConstants } from "../actions/constatns";

const initialState = {
  error: null,
  kind: "",
};

const alertReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case alertConstants.ALERT_SET:
      return (state = {
        ...state,
        error: payload.error,
        kind: payload.kind,
      });
    case alertConstants.ALERT_REMOVE:
      return (state = {
        ...state,
        error: null,
        kind: "",
      });

    default:
      return state;
  }
};

export default alertReducer;
