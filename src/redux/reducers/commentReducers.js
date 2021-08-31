import { commentConstants } from "../actions/constatns";

const initialState = {
  comments: null,
  loading: true,
  errors: null,
  done: false,
  allDocs: null,
  page: null,
};

const commentReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case commentConstants.GET_NOT_APPROVED_COMMENTS_SUCCESS:
      return (state = {
        ...state,
        comments: payload.data,
        loading: false,
        errors: null,
        done: false,
        allDocs: payload.allDocs,
        page: payload.page,
      });
    case commentConstants.GET_NOT_APPROVED_COMMENTS_FAIL:
      return (state = {
        ...state,
        comments: null,
        loading: false,
        done: false,
        errors: payload,
      });
    case commentConstants.UPDATE_NOT_APPROVED_COMMENTS_SUCCESS:
      return (state = {
        ...state,
        loading: false,
        errors: null,
        done: true,
      });
    case commentConstants.UPDATE_NOT_APPROVED_COMMENTS_FAIL:
      return (state = {
        ...state,
        loading: false,
        errors: payload,
        done: false,
      });
    case commentConstants.DELETE_COMMENT_SUCCESS:
      return (state = {
        ...initialState,
        loading: false,
        done: true,
      });
    case commentConstants.DELETE_COMMENT_FAIL:
      return (state = {
        ...state,
        loading: false,
        errors: payload,
        done: false,
      });
    default:
      return state;
  }
};

export default commentReducer;
