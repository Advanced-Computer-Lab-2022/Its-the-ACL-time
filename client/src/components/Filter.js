import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  margin: {
    margin: theme.spacing(1),
  },
  price: {
    marginBottom: '5rem',
  },
  filter: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

export default function Filter({ onFilter }) {
  const classes = useStyles();
  const [subject, setSubject] = useState([]);

  return (
    <div className={`${classes.filter}`}>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor='age-native-simple'>Subject</InputLabel>
        <Select
          native
          onChange={onFilter}
          inputProps={{
            name: 'age',
            id: 'subject',
          }}
        >
          <option aria-label='None' value='' />
          <option value='Machine Learning'>Machine Learning</option>
          <option value='Deep Learning'>Deep Learning</option>
          <option value='Software Engineering'>Software Engineering</option>
          <option value='computer science'>Computer Science</option>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor='age-native-simple'>Min rating</InputLabel>
        <Select
          native
          onChange={onFilter}
          inputProps={{
            name: 'age',
            id: 'minRating',
          }}
        >
          <option aria-label='None' value='' />
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor='age-native-simple'>Max rating</InputLabel>
        <Select
          native
          onChange={onFilter}
          inputProps={{
            name: 'age',
            id: 'maxRating',
          }}
        >
          <option aria-label='None' value='' />
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor='age-native-simple'>Min Price</InputLabel>
        <Select
          native
          onChange={onFilter}
          inputProps={{
            name: 'age',
            id: 'minPrice',
          }}
        >
          <option aria-label='None' value='' />
          <option value={0}>free</option>
          <option value={10}>10</option>
          <option value={100}>100</option>
          <option value={1000}>1000</option>
          <option value={10000}>10000</option>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor='age-native-simple'>Max Price</InputLabel>
        <Select
          native
          onChange={onFilter}
          inputProps={{
            name: 'age',
            id: 'maxPrice',
          }}
        >
          <option aria-label='None' value='' />
          <option value={0}>free</option>
          <option value={10}>10</option>
          <option value={100}>100</option>
          <option value={1000}>1000</option>
          <option value={10000}>10000</option>
        </Select>
      </FormControl>
    </div>
  );
}
