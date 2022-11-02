import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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

export default function Filter({ onFilter }) {
  const classes = useStyles();

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
          <option value='Data Science'>Data Science</option>
          <option value='Web Development'>Web Development</option>
          <option value='Artificial Intelligence'>
            Artificial Intelligence
          </option>
          <option value='Programming'>Programming</option>
          <option value='Mobile Development'>Mobile Development</option>
          <option value='Game Development'>Game Development</option>
          <option value='Cyber Security'>Cyber Security</option>
          <option value='Cloud Computing'>Cloud Computing</option>
          <option value='Blockchain'>Blockchain</option>
          <option value='Internet of Things'>Internet of Things</option>
          <option value='Data Analysis'>Data Analysis</option>
          <option value='Data Visualization'>Data Visualization</option>
          <option value='Data Engineering'>Data Engineering</option>
          <option value='Database Engineering'>Database Engineering</option>
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
