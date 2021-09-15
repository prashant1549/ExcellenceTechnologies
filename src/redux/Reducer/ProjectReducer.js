import {
  CREATE_PROJECT,
  ALL_PROJECT,
  USER_PROFILE,
  CREATE_EMPLOYEE,
  ALL_EMPLOYEE,
  ACCESS_TOKEN,
} from '../Action/Type';

const initialState = {
  project: [],
  user: {},
  employees: [],
  token: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PROJECT:
      return {
        ...state,
        project: state.project.concat(action.data),
      };
    case ALL_PROJECT:
      return {
        ...state,
        project: action.data,
      };
    case USER_PROFILE:
      return {
        ...state,
        user: action.user,
      };
    case ACCESS_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case CREATE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.concat(action.data),
      };
    case ALL_EMPLOYEE:
      return {
        ...state,
        employees: action.data,
      };
    default:
      return state;
  }
};
