import { Box, Checkbox, FormControlLabel } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  Box: {
    width: '20rem',
    height: '3.5rem',
    margin: '1rem',
    padding: '0.5rem',
    border: 'none',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
  },
  title: {
    fontSize: '2rem',
    display: 'inline-block',
  },
  list: {
    width: '15rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    justifyContent: 'center',
    margin: '2rem',
  },
  showMore: {
    border: 'none',
    backgroundColor: 'transparent',
    color: '#3f51b5',
    fontSize: '1rem',
    cursor: 'pointer',
  },
}));

const FilterField = ({ title, options, onFilter }) => {
  const classes = useStyles();
  const [visible, setVisible] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [checked, setChecked] = useState({});

  // useEffect(() => {
  //   const obj = {};
  //   options.forEach((item) => (obj[item] = false));
  //   setChecked(obj);
  // }, [options]);

  const handleCheck = async (e) => {
    onFilter(
      // {
      // ...checked,
      //   [e.target.name]: e.target.checked,
      // },
      e.target.name,
      title
    );
    console.log(e);
    setChecked({ ...checked, [e.target.name]: e.target.checked });
  };

  return (
    <>
      <Box
        component='aside'
        className={`${classes.Box}`}
        onClick={() => setVisible(!visible)}
      >
        <h1 className={`${classes.title}`}>{title}</h1>
        <i className='fa-light fa-arrow-down'></i>
      </Box>
      {visible && (
        <div className={`${classes.list}`}>
          {options
            .map((subject, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    name={subject}
                    onChange={handleCheck}
                    checked={checked[subject]}
                  />
                }
                label={subject}
              />
            ))
            .slice(0, showMore ? options.length : 5)}

          {options.length > 5 && (
            <button
              className={`${classes.showMore}`}
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? 'Show Less' : 'Show More'}
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default FilterField;
