import {
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAILURE,
  SET_PAGE,
  NEXT_PAGE,
  PREV_PAGE,
} from './actions';

const initialState = {
  tasks: [],
  currentPage: 1,
  totalPages: 1,
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TASKS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_TASKS_SUCCESS:
      return {
        ...state,
        tasks: action.payload.tasks,
        totalPages: action.payload.totalPages,
        loading: false,
      };
    case FETCH_TASKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SET_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case NEXT_PAGE:
      return {
        ...state,
        currentPage: state.currentPage + 1,
      };
    case PREV_PAGE:
      return {
        ...state,
        currentPage: state.currentPage - 1,
      };
    default:
      return state;
  }
};

export default reducer;
