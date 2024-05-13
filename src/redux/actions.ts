import { Dispatch } from 'redux';
import { apiClient } from '../utils/http.util';

export const FETCH_TASKS_REQUEST = 'FETCH_TASKS_REQUEST';
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const FETCH_TASKS_FAILURE = 'FETCH_TASKS_FAILURE';
export const SET_PAGE = 'SET_PAGE';
export const NEXT_PAGE = 'NEXT_PAGE';
export const PREV_PAGE = 'PREV_PAGE';

export const fetchTasksRequest = () => ({
  type: FETCH_TASKS_REQUEST,
});

export const fetchTasksSuccess = (tasks) => ({
  type: FETCH_TASKS_SUCCESS,
  payload: tasks,
});

export const fetchTasksFailure = (error) => ({
  type: FETCH_TASKS_FAILURE,
  payload: error,
});

export const setPage = (page) => ({
  type: SET_PAGE,
  payload: page,
});

export const nextPage = () => ({
  type: NEXT_PAGE,
});

export const prevPage = () => ({
  type: PREV_PAGE,
});

export const fetchTasks = (page: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchTasksRequest());
    try {
      const response: any = await apiClient.get(`tasks?page=${page}`);
      if (!response.result) {
        throw new Error('Failed to fetch tasks');
      }

      dispatch(
        fetchTasksSuccess({
          ...response,
          tasks: response.result,
        })
      );
    } catch (error) {
      dispatch(fetchTasksFailure(error.message));
    }
  };
};
