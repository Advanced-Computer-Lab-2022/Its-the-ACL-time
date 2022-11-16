import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  img: {
    width: 128,
    height: 128,
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'cover',
  },
  root: {
    padding: '1rem',
    // make shadow
    boxShadow: '0 0 10px rgba(.5,.5,.5,0.1)',
    marginBottom: '1rem',
  },

  course: {
    minWidth: '17rem',
    maxWidth: '17rem',
    minHeight: '17rem',
    maxHeight: '22rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 0 10px rgba(.5,.5,.5,0.1)',
    paddingBottom: '2rem',
    overflow: 'hidden',
    marginRight: '1rem',
  },

  core: {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  imgVertical: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'cover',
  },
  description: {
    minHeight: '3rem',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': 3,
    '-webkit-box-orient': 'vertical',
  },
}));

function CourseComponent({
  title,
  description,
  instructor,
  price,
  subject,
  courseId,
  horizontal,
}) {
  const classes = useStyles();

  return (
    <>
      {horizontal && (
        <div className={`${classes.root}`}>
          <Link
            to={`/course/${courseId}`}
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <Grid container spacing={2}>
              <Grid item>
                <img
                  className={classes.img}
                  alt='complex'
                  src='https://www.patterns.dev/img/reactjs/react-logo@3x.svg'
                />
              </Grid>

              <Grid item xs={5} sm container>
                <Grid item xs container direction='column' spacing={2}>
                  <Grid item xs>
                    <Typography gutterBottom variant='subtitle1'>
                      {title || 'Course Title'}
                    </Typography>
                    <Typography variant='body2' gutterBottom>
                      {instructor || 'Course Instructor'}
                    </Typography>
                    <Typography gutterBottom variant='body2'>
                      {subject || 'Subject'}
                    </Typography>
                    <Typography variant='body2' color='textSecondary'>
                      {description || 'Course Description'}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant='body2' style={{ cursor: 'pointer' }}>
                      Add to Cart
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography variant='subtitle1'>${price}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <hr />
          </Link>
        </div>
      )}
      {!horizontal && (
        <Box className={`${classes.course}`}>
          <Link
            to={`/course/${courseId}`}
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <img
              className={classes.imgVertical}
              alt='complex'
              src='https://www.patterns.dev/img/reactjs/react-logo@3x.svg'
            />
            <div className={`${classes.core}`}>
              <Typography gutterBottom variant='subtitle1'>
                {title || 'Course Title'}
              </Typography>
              <Typography variant='body2' gutterBottom>
                {instructor || 'Course Instructor'}
              </Typography>
              <Typography gutterBottom variant='body2'>
                {subject || 'Subject'}
              </Typography>
              <Typography
                variant='body2'
                color='textSecondary'
                className={`${classes.description}`}
              >
                {description.slice(0, 50) || 'Course Description'}
              </Typography>
              <Typography variant='subtitle1'>${price}</Typography>
            </div>
          </Link>
        </Box>
      )}
    </>
  );
}

export default CourseComponent;
