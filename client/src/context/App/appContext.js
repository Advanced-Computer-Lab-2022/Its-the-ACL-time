import React, { useContext, useState } from 'react';
import axios from 'axios';
import { backendApi } from '../../projectConfig';
import { useEffect } from 'react';
import { authActions } from '../../store/slices/auth-slice';
import { useDispatch } from 'react-redux';
import { getCourses } from '../../store/slices/course-slice';
import { getMyCourses } from '../../store/slices/myCourses_slice';

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  alert: false,
  alertType: '',
  alertText: '',
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, setState] = useState(() => initialState);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  // useEffect(() => {
  //   console.log('AppContext useEffect');
  //   const fetchState = async () => {
  //     const userFromLocalStorage = localStorage.getItem('user');
  //     const tokenFromLocalStorage = localStorage.getItem('token');

  //     console.log(userFromLocalStorage);

  //     authActions.login({
  //       user: JSON.parse(userFromLocalStorage),
  //       token: tokenFromLocalStorage,
  //       isLoggedIn: true,
  //     });

  //     setState({
  //       ...state,
  //       user: JSON.parse(userFromLocalStorage),
  //       token: tokenFromLocalStorage,
  //     });
  //   };
  //   // fetchState();
  // }, []);

  const setup = async ({
    email,
    password,
    username,
    country,
    type,
    endPoint,
  }) => {
    setState((prevState) => {
      return {
        ...prevState,
        isLoading: true,
      };
    });

    const url = `http://localhost:8080/api/v1/auth/${endPoint}`;

    try {
      let body = {
        email,
        password,
        country,
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

      // addToLocalStorage({ user, token });

      setState((prevState) => {
        return {
          ...prevState,
          user,
          token,
        };
      });

      return {
        msg: 'Successfully! Redirecting to home page...',
        type: true,
        admin: user?.type === 'Admin',
      };
    } catch (error) {
      return {
        msg: error.response.data.msg,
        type: false,
      };
    }
  };

  const resetUser = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setState({
      ...state,
      user: null,
      token: null,
    });
  };

  const updateUser = async (user) => {
    try {
      const response = await axios.patch(
        'http://localhost:8080/api/v1/user/',
        {
          ...user,
        },
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      const { data } = response;
      setState((prevState) => {
        return {
          ...prevState,
          user: data,
        };
      });
      // addToLocalStorage({ user: data, token: state.token });
      return {
        type: true,
        msg: 'Profile Updated successfully',
      };
    } catch (error) {
      console.log(error);
      return {
        type: false,
        msg: error.response.data.msg,
      };
    }
  };

  useEffect(() => {
    if (user && token) {
      dispatch(
        authActions.login({
          user,
          token,
        })
      );
      dispatch(getMyCourses(token));
    }
    dispatch(getCourses());
  }, [token]);

  return (
    <AppContext.Provider
      value={{
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
