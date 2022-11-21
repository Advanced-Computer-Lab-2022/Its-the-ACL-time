import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core';
import { FaStar } from 'react-icons/fa';

const useStyles = makeStyles((theme) => ({
  stars: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '2rem',
  },
  star: {
    cursor: 'pointer',
  },
  review: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '1rem',
  },
  textarea: {
    width: '30rem',
    height: '10rem',
    resize: 'none',
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '5px',
    fontSize: '1rem',
  },

  btn: {
    marginTop: '1rem',
    width: '10rem',
    height: '3rem',
    // 70, 70, 71
    backgroundColor: 'rgb(70, 70, 71)',
    color: 'white',
    '&:hover': {
      // 25, 25, 26
      backgroundColor: 'rgb(25, 25, 26)',
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function RatingForm() {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const [clicked, setClicked] = useState(null);
  const [hover, setHover] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmitRating = () => {};

  return (
    <div>
      <Button variant='outlined' color='primary' onClick={handleClickOpen}>
        Slide in alert dialog
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle
          id='alert-dialog-slide-title'
          style={{ textAlign: 'center', display: 'inline' }}
        >
          How would you rate this course?
        </DialogTitle>

        <p
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          Select Rating
        </p>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            <div className={`${classes.stars}`}>
              {[...Array(5)].map((_, idx) => {
                return (
                  <div
                    className={`${classes.star}`}
                    onClick={() => setClicked(idx + 1)}
                    onMouseLeave={() => setHover(null)}
                    onMouseEnter={() => setHover(idx + 1)}
                  >
                    <FaStar
                      size={40}
                      color={(hover || clicked) > idx ? '#ffc107' : '#e4e5e9'}
                    />
                  </div>
                );
              })}
            </div>
            <div className={`${classes.review}`}>
              <textarea
                className={`${classes.textarea}`}
                placeholder='Tell us about your own personal experience taking this course. Was it a good match for you?'
              />
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmitRating} className={`${classes.btn}`}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
