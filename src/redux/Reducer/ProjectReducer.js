import {CREATE_PROJECT, ALL_PROJECT} from '../Action/Type';

const initialState = {
  project: [],
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
    default:
      return state;
  }
};
