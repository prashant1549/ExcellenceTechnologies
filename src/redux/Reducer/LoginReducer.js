import {
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_DEFAULT,
  ACCESS_TOKEN,
} from '../Action/Type';

const initialState = {
  user: {},
  isloading: false,
  isSuccess: false,
  isError: false,
  token: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  const data = {...action.payload};
  switch (action.type) {
    case LOGIN_REQUEST:
      return {...state, isloading: true, isSuccess: false, isError: false};
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: data,
        isloading: false,
        isSuccess: true,
        isError: false,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        userStatus: data.data,
        isloading: false,
        isSuccess: false,
        isError: true,
      };
    case ACCESS_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case LOGIN_DEFAULT:
      return {...state, isloading: false, isSuccess: false, isError: false};
    default:
      return state;
  }
};
