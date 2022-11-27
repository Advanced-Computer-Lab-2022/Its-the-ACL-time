import React, { useRef } from 'react';
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
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { useAppContext } from '../context/App/appContext';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://mui.com/'>
        Nerd academy
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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

  const {
    setup,
    setAlert,
    clearAlert,
    alert,
    alertText,
    alertType,
    isLoading,
  } = useAppContext();

  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const user = {
      email: email.current.value,
      password: password.current.value,
      endPoint: 'login',
    };
    if (!user.email || !user.password) {
      setAlert('error', 'Please Provide all values');
      setTimeout(() => clearAlert(), 3000);
    } else {
      const status = await setup(user);
      if (status) {
        console.log('Login Success' + status);
        setTimeout(() => navigate('/'), 3000);
      }
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        {isLoading && <Loading type='spinningBubbles' color='red' />}
        {alert && (
          <Alert variant='filled' severity={alertType}>
            {alertText}
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
