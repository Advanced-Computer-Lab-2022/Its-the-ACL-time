import React, { useRef, useState } from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from '@material-ui/core';
import { Loading } from '../components';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { Navigate, useNavigate } from 'react-router-dom';
import SchoolOutlinedIcon from '@material-ui/icons/SchoolOutlined';
import Copyright from '../components/Copyright';
import { login } from '../store/slices/auth-slice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();

  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);
  const [alertType, setAlertType] = useState(null);
  const loading = useSelector((state) => state.auth.isLoading);
  const message = useSelector((state) => state.auth.message);
  const type = useSelector((state) => state.auth.type);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const clearAlert = () => {
    setTimeout(() => {
      setAlert(null);
      setAlertType(null);
    }, 3000);
  };

  useEffect(() => {
    if (message && type) {
      setAlert(message);
      setAlertType(type);
      clearAlert();
    }
  }, [message, type]);

  useEffect(() => {
    if (isLoggedIn) {
      if (isAdmin) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }
  }, [isLoggedIn]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = {
      email: email.current.value,
      password: password.current.value,
    };
    if (!user.email || !user.password) {
      setAlert('Please fill in all fields');
      setAlertType('error');
      clearAlert();
    } else {
      dispatch(login(user));
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <SchoolOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        {loading && <Loading type='spinningBubbles' color='red' />}
        {alert && (
          <Alert variant='filled' severity={alertType}>
            {alert}
          </Alert>
        )}
        <form className={classes.form} noValidate>
          <TextField
            inputRef={email}
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
          />
          <TextField
            inputRef={password}
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Remember me'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            onClick={handleLogin}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link
                variant='body2'
                onClick={() => {
                  navigate('/forgetPassword');
                }}
                style={{ cursor: 'pointer' }}
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href='/register' variant='body2'>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
