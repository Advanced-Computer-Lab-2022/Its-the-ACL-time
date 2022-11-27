import {
  SET_ALERT,
  CLEAR_ALERT,
  USER_SETUP_BEGIN,
  USER_SETUP_SUCCESS,
  USER_SETUP_ERROR,
  START_ACTION,
  END_ACTION,
  USER_RESET,
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

    case START_ACTION: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case END_ACTION: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case USER_RESET: {
      return {
        ...state,
        user: null,
        token: null,
      };
    }

    default:
      return state;
  }
};

export default appReducer;
