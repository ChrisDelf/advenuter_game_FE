import { types } from '../actions/index';
const {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  ERROR_CLEAN,
  USER_LOGIN_SUCCES,
  INFO_START,
  INFO_SUCCESS,
  INFO_FAILURE
} = types;

const initialState = {
  token: '',
  user: '',
  userid: '',
  isAuth: !!localStorage.getItem('token'),
  isLoading: false,
  isSuccess: false,
  error: ''
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_START:
      return {
        ...state,
        error: '',
        isLoading: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        error: '',
        isAuth: true,
        isLoading: false,
        token: payload.token,
        isSuccess: true
      };
    case USER_LOGIN_SUCCES:
      return {
        ...state,
        user: payload
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload
      };
    case INFO_START:
      return {
        ...state,
        error: '',
        isLoading: true
      };
    case INFO_SUCCESS:
      return {
        ...state,
        error: '',
        isLoading: false,
        userid: payload,
      }
    case INFO_FAILURE:
      return {
        ...state,
        error: payload,
        isLoading: false
      };

    case ERROR_CLEAN:
      return {
        ...state,
        error: ''
      };

    default:
      return state;
  }
};
export default authReducer;
