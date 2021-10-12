import { usersConstants } from "../actions/constatns";

const initialState = {
  users: [],
  errors: null,
  singleDoctor: null,
  done: false,
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case usersConstants.GET_ALL_USERS_SUCCESS:
      return (state = {
        ...state,
        users: payload,
      });

    case usersConstants.GET_ALL_USERS_FAIL:
      return (state = {
        ...state,
        errors: payload,
      });

    case usersConstants.GET_SINGLE_DOCTOR_SUCCESS:
      return (state = {
        ...state,
        singleDoctor: payload,
      });
    case usersConstants.GET_SINGLE_DOCTOR_FAIL:
      return (state = {
        ...state,
        singleDoctor: null,
        errors: payload,
      });

    case usersConstants.UPDATE_SINGLE_DOCTOR_SUCCESS:
      return (state = {
        ...state,
        done: true,
      });
    case usersConstants.UPDATE_SINGLE_DOCTOR_FAIL:
      return (state = {
        ...state,
        errors: payload,
      });

    default:
      return state;
  }
};

export default userReducer;
