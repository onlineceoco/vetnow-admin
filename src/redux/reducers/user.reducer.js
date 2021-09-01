import { usersConstants } from "../actions/constatns";

const initialState = {
  users: [],
  errors: null,
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

    default:
      return state;
  }
};

export default userReducer;
