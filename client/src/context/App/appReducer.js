import {
  SET_ALERT,
  CLEAR_ALERT,
  USER_SETUP_BEGIN,
  USER_SETUP_SUCCESS,
  USER_SETUP_ERROR,
} from './appActions';

const appReducer = (state, action) => {
  switch (action.type) {
    case SET_ALERT: {
      return {
        ...state,
        alert: true,
        alertText: action.payload.text,
        alertType: action.payload.type,
      };
    }

    case CLEAR_ALERT: {
      return {
        ...state,
        alert: false,
        alertText: '',
        alertType: '',
      };
    }

    case USER_SETUP_BEGIN: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case USER_SETUP_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        alert: true,
        alertText: 'Success! Redirect...',
        alertType: 'success',
        user: action.payload.user,
        token: action.payload.token,
      };
    }

    case USER_SETUP_ERROR: {
      return {
        ...state,
        isLoading: false,
        alert: true,
        alertText: action.payload.msg,
        alertType: 'error',
      };
    }

    default:
      return state;
  }
};

export default appReducer;
