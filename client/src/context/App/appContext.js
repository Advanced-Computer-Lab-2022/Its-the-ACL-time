import React, { useContext, useReducer } from 'react';
import appReducer from './appReducer';
import {
  USER_SETUP_BEGIN,
  USER_SETUP_SUCCESS,
  USER_SETUP_ERROR,
  SET_ALERT,
  CLEAR_ALERT,
  START_ACTION,
  END_ACTION,
} from './appActions';
import axios from 'axios';

const userFromLocalStorage = localStorage.getItem('user');
const tokenFromLocalStorage = localStorage.getItem('token');

const initialState = {
  user: JSON.parse(userFromLocalStorage),
  token: tokenFromLocalStorage,
  isLoading: false,
  alert: false,
  alertType: '',
  alertText: '',
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const setAlert = (type, text) => {
    dispatch({
      type: SET_ALERT,
      payload: {
        text,
        type,
      },
    });
  };

  const clearAlert = () => {
    setTimeout(() => dispatch({ type: CLEAR_ALERT }), 3000);
  };

  const addToLocalStorage = ({ user, token }) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  };

  const removeToLocalStorage = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const setup = async ({ email, password, username,country, type, endPoint }) => {
    dispatch({ type: USER_SETUP_BEGIN });
    const url = `http://localhost:8080/api/v1/auth/${endPoint}`;

    try {
      let body = {
        email,
        password,
        country
      };

      if (endPoint === 'register')
        body = {
          ...body,
          type,
          username,
        };

      const response = await axios.post(url, body);

      const { data } = response;
      const { token, user } = data;

      dispatch({
        type: USER_SETUP_SUCCESS,
        payload: {
          token,
          user,
        },
      });

      addToLocalStorage({ user, token });
    } catch (error) {
      console.log(error.response.data.msg);
      dispatch({
        type: USER_SETUP_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        setAlert,
        clearAlert,
        setup,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { useAppContext, AppProvider };
