import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getMyCourses } from './myCourses_slice';

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;

    try {
      const response = await axios.post(
        'http://localhost:8080/api/v1/auth/login',
        {
          email,
          password,
        }
      );
      const { token, user } = response.data;
      dispatch(getMyCourses(token));
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      return response.data;
    } catch (error) {
      const msg = error.response.data?.message || error.response.data?.msg;
      return rejectWithValue(msg);
    }
  }
);

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (user, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const token = getState().auth.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.patch(
        `http://localhost:8080/api/v1/user`,
        {
          ...user,
        },
        config
      );

      localStorage.setItem('user', JSON.stringify(response.data));

      return response.data;
    } catch (error) {
      const msg = error.response.data?.message || error.response.data?.msg;
      return rejectWithValue(msg);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isLoggedIn: false,
    isLoading: false,
    message: null,
    type: null,
    isAdmin: false,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.isLoading = false;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      state.isLoading = false;
      state.message = null;
      state.type = null;
      state.isAdmin = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.isLoading = true;
      state.message = 'Logging in...';
      state.type = 'info';
    },
    [login.fulfilled]: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.isLoading = false;
      state.message = 'Login successful, redirecting...';
      state.type = 'success';
      state.isAdmin = action.payload.user.type === 'Admin';
    },
    [login.rejected]: (state) => {
      state.isLoading = false;
      state.message = 'Login failed, please try again';
      state.type = 'error';
    },

    [updateUser.pending]: (state) => {
      state.isLoading = true;
      state.message = 'Updating user...';
      state.type = 'info';
    },

    [updateUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.message = 'User updated successfully!';
      state.type = 'success';
    },

    [updateUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.type = 'error';
    },
  },
});

export default authSlice.reducer;

export const authActions = {
  login: authSlice.actions.login,
  logout: authSlice.actions.logout,
};
