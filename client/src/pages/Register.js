import React, { useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  MenuItem,
} from '@material-ui/core';
import { Loading, CountrySelector } from '../components';
import Alert from '@material-ui/lab/Alert';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { useAppContext } from '../context/App/appContext';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://mui.com/'>
        Your Website
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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register() {
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

  const password = useRef(null);
  const username = useRef(null);
  const email = useRef(null);
  const category = useRef(null);
  const [country, setCountry] = useState('Country');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    // get the values from the form
    const user = {
      username: username.current.value,
      password: password.current.value,
      email: email.current.value,
      type: category.current.value,
      country: country.label,
      endPoint: 'register',
    };

    if (
      !user.username ||
      !user.password ||
      !user.email ||
      !user.type ||
      !user.country
    ) {
      console.log('error');
      setAlert('error', 'Please Provide all values');
      setTimeout(() => clearAlert(), 3000);
    } else {
      const status = await setup(user);
      if (status) {
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
          Sign Up
        </Typography>
        {isLoading && <Loading type='String' color='red' />}

        {alert && (
          <Alert variant='filled' severity={alertType}>
            {alertText}
          </Alert>
        )}

        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                inputRef={username}
                variant='outlined'
                required
                fullWidth
                id='username'
                label='User name'
                name='username'
                autoComplete='username'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputRef={email}
                variant='outlined'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputRef={password}
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select={true}
                inputRef={category}
                variant='outlined'
                required
                fullWidth
                name='category'
                label='Category'
                type='password'
                id='category'
                defaultValue={'user'}
              >
                <MenuItem value='Admin'>Admin</MenuItem>
                <MenuItem value='Instructor'>Instructor</MenuItem>
                <MenuItem value='Individual trainee'>
                  Individual trainee
                </MenuItem>
                <MenuItem value='Corporate trainee'>Corporate trainee</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <label>Country</label>
              <CountrySelector setCountry={setCountry} />
            </Grid>
            {/* <Grid item xs={12}>
              <InputLabel id='label'>Category</InputLabel>
              <Select labelId='label' id='select' value='20' ref={category}>
                <MenuItem value='Student'>Student</MenuItem>
                <MenuItem value='Instructor'>Instructor</MenuItem>
              </Select>
            </Grid> */}
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value='allowExtraEmails' color='primary' />}
                label='I want to receive inspiration, marketing promotions and updates via email.'
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            onClick={handleRegister}
          >
            Sign Up
          </Button>
          <Grid container justifyContent='flex-start'>
            <Grid item>
              <Link href='/login' variant='body2'>
                Already have an account? Sign In
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
