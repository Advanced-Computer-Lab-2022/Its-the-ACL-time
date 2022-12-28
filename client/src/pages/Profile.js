import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import BookIcon from '@material-ui/icons/Book';
import { Avatar, Paper, Tabs, TextField } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import { useCourseContext } from '../context/Course/courseContext';
import Footer from '../components/Footer';
import engagingCourse from '../assets/images/engaging-course.jpg';
import buildAudience from '../assets/images/build-audience.jpg';
import videoCreating from '../assets/images/video-creation.jpg';
import Courses from './Courses';
import { Alert, Pagination } from '@material-ui/lab';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import ChatIcon from '@material-ui/icons/Chat';
import HelpIcon from '@material-ui/icons/Help';
import { useAppContext } from '../context/App/appContext';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import AssessmentIcon from '@material-ui/icons/Assessment';
import CourseComponent from '../components/course/CourseComponent';
import Loading from '../components/Loading';
import MessageIcon from '@material-ui/icons/Message';
// import money icon
import RefundIcon from '@material-ui/icons/AttachMoney';
import axios from 'axios';

const drawerWidth = 240;

const InstructorSideBar = [
  {
    title: 'My Courses',
    icon: <BookIcon />,
  },
  {
    title: 'Wallet',
    icon: <AccountBalanceWalletIcon />,
  },
  {
    title: 'Performance',
    icon: <AssessmentIcon />,
  },
  {
    title: 'Messages',
    icon: <MessageIcon />,
  },
];

const CorporateSideBar = [
  {
    title: 'Wallet',
    icon: <AccountBalanceWalletIcon />,
  },
  {
    title: 'Messages',
    icon: <MessageIcon />,
  },
];

const IndividualSideBar = [
  {
    title: 'Refund',
    icon: <RefundIcon />,
  },
  {
    title: 'Wallet',
    icon: <AccountBalanceWalletIcon />,
  },
  {
    title: 'Messages',
    icon: <MessageIcon />,
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    display: 'fixed',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 0 10px rgba(0,0,0,0.5)',
    paddingLeft: '2rem',
    paddingRight: '2rem',
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
    color: 'white',
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    marginTop: '5rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  name: {
    borderRadius: '15px',
    padding: '5px 15px',
    color: 'white',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '1.7rem',
    lineHeight: '19px',
    textDecoration: 'none',
    '&:hover': {
      color: 'grey',
    },

    courses: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginLeft: '1rem',
      marginTop: '1rem',
    },
  },

  card: {
    display: 'flex',
    maxHeight: '30rem',
    minHeight: '17rem',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    border: '1px solid #e0e0e0',
    borderRadius: '15px',
    backgroundColor: 'white',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    '&:hover': {
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.5)',
      backgroundColor: '#e0e0e0',
    },
  },

  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '15px',
  },

  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginLeft: '1rem',
  },

  supportCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 0 10px 0 rgba(0,0,0,0.3)',
    padding: '1rem',
    width: '20rem',
    marginRight: '2rem',
  },
  biography: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '2rem',
  },

  tabs: {
    flexGrow: 1,
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  formRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: '2rem',
  },
}));

const Card = ({ image, title, text }) => {
  const classes = useStyles();

  return (
    <div className={classes.card}>
      <div>
        <img src={image} alt='engaging-course' className={classes.image} />
      </div>
      <div className={classes.cardContent}>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
    </div>
  );
};

const Refund = ({ refundMoney, state, course }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '2rem',
        backgroundColor: '#e0e0e0',
        padding: '1rem',
        borderRadius: '15px',
        '&:hover': {
          backgroundColor: '#bdbdbd',
        },
      }}
    >
      {`You have requested a refund of $${refundMoney} for the course ${course}. Your request is currently`}
      {state === 'pending' ? (
        <span style={{ color: 'orange' }}> pending</span>
      ) : state === 'approved' ? (
        <span style={{ color: 'green' }}> approved</span>
      ) : (
        <span style={{ color: 'red' }}> denied</span>
      )}
    </div>
  );
};

function InstructorProfile({ courses }) {
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const classes = useStyles();

  return (
    <>
      {courses.length === 0 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '80%',
          }}
        >
          <Card
            image={engagingCourse}
            title='Create an Engaging Course'
            text={
              'Whether you have been teaching for years or are teaching for the first time, you can make an engaging course. We have compiled resources and best practices to help you get to the next level, no matter where you are starting.'
            }
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '2rem',
            }}
          >
            <div
              style={{
                marginRight: '2rem',
              }}
            >
              <Card
                title={'Build Your Audience'}
                text={
                  'Set your course up for success by building your audience.'
                }
                image={buildAudience}
              />
            </div>
            <div>
              <Card
                title={'Get Started with Video'}
                text={
                  'Quality video lectures can set your course apart. Use our resources to learn the basics.'
                }
                image={videoCreating}
              />
            </div>
          </div>
          <button
            className='btn btn-primary'
            style={{
              marginTop: '2rem',
              width: '20rem',
              height: '3rem',
              fontSize: '1.5rem',
            }}
            onClick={() => {
              navigate('/addCourse');
            }}
          >
            Create a Course
          </button>
        </div>
      )}
      {courses.length !== 0 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '80%',
          }}
        >
          <div className={classes.courses}>
            <h2>My Courses</h2>
            {courses
              ?.slice(page * 3, Math.min(page * 3 + 3, courses.length))
              .map((course) => {
                return (
                  <CourseComponent
                    key={course?._id}
                    title={course?.title}
                    subject={course?.subject}
                    description={course?.summary}
                    instructor={course?.createdBy.username}
                    price={course?.price}
                    courseId={course?._id}
                    horizontal={true}
                    rating={course?.rating}
                    progress={course?.progress}
                  />
                );
              })}
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              marginTop: '2rem',
            }}
          >
            <Pagination
              count={Math.ceil(courses.length / 3)}
              onChange={(e, value) => setPage(value - 1)}
              color='primary'
            />
          </div>
          <br />
          <br />
          <p>Have questions? Here are our most popular instructor resources.</p>
          <br />
          <br />
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '2rem',
            }}
          >
            <div className={classes.supportCard}>
              <VideoLibraryIcon
                style={{
                  fontSize: '3rem',
                  marginBottom: '1rem',
                }}
              />
              <h3>Test Video</h3>
              <p>Send us a sample video and get expert feedback</p>
            </div>
            <div className={classes.supportCard}>
              <ChatIcon
                style={{
                  fontSize: '3rem',
                  marginBottom: '1rem',
                }}
              />
              <h3>Instructor Community</h3>
              <p>
                Connect with experienced instructors. Ask questions, browse
                discussions, and more.
              </p>
            </div>
            <div className={classes.supportCard}>
              <HelpIcon
                style={{
                  fontSize: '3rem',
                  marginBottom: '1rem',
                }}
              />
              <h3>Help and Support</h3>
              <p>Browse our Help Center or contact our support team.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const Settings = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const { updateUser } = useAppContext();
  const [alert, setAlert] = useState(null);
  const [alertType, setAlertType] = useState(null);

  const cleanForm = () => {
    document.getElementById('username').value = '';
    document.getElementById('email').value = '';
    document.getElementById('oldPassword').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('bio').value = '';
    document.getElementById('country').value = '';
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const oldPassword = document.getElementById('oldPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const biography = document.getElementById('bio').value;
    const country = document.getElementById('country').value;

    if (
      !username &&
      !email &&
      !oldPassword &&
      !newPassword &&
      !biography &&
      !country
    ) {
      console.log('no fields filled');
      setAlert('Please fill in at least one field');
      setAlertType('error');

      setTimeout(() => {
        setAlert(null);
        setAlertType(null);
      }, 2000);
      return;
    }

    const result = await updateUser({
      username,
      email,
      oldPassword,
      newPassword,
      biography,
      country,
    });

    if (result.type) {
      setAlert(result.msg);
      setAlertType('success');
      setTimeout(() => {
        setAlert(null);
        setAlertType(null);
        cleanForm();
      }, 2000);
    } else {
      setAlert(result.msg);
      setAlertType('error');
      setTimeout(() => {
        setAlert(null);
        setAlertType(null);
        cleanForm();
      }, 2000);
    }
  };

  return (
    <div>
      {alert && <Alert severity={alertType}>{alert}</Alert>}
      <h1>Profile Settings</h1>
      <Paper className={classes.tabs}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor='primary'
          textColor='primary'
          centered
        >
          <Tab label='Profile' />
        </Tabs>
      </Paper>
      <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.formRow}>
          <TextField
            id='username'
            label='Username'
            variant='outlined'
            style={{
              marginRight: '2rem',
            }}
          />
          <TextField id='email' label='Email' type='email' variant='outlined' />
        </div>
        <div className={classes.formRow}>
          <TextField
            id='country'
            label='Country'
            variant='outlined'
            style={{
              marginRight: '2rem',
            }}
          />
          <TextField id='bio' label='bio' variant='outlined' />
        </div>
        <div className={classes.formRow}>
          <TextField
            id='oldPassword'
            label='Old Password'
            variant='outlined'
            type='password'
            style={{
              marginRight: '2rem',
            }}
          />
          <TextField
            id='newPassword'
            type='password'
            label='New Password'
            variant='outlined'
          />
        </div>
        <Button
          variant='contained'
          type='submit'
          style={{
            marginTop: '2rem',
            width: '20rem',
            height: '3rem',
            fontSize: '1.2rem',
            backgroundColor: 'rgba(24, 26, 27, 0.87)',
            color: 'white',
          }}
        >
          update profile
        </Button>
      </form>
    </div>
  );
};

export default function Profile() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [component, setComponent] = useState('My Courses');
  const { myCourses } = useCourseContext();
  const { user } = useAppContext();
  const [value, setValue] = React.useState(0);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [refunds, setRefunds] = useState([]);

  useEffect(() => {
    async function getRefund() {
      const res = await axios.get('http://localhost:8080/api/v1/refund/');
      console.log(res.data);
      setRefunds(res.data);
    }

    if (component === 'My Courses' && myCourses) {
      setCourses(myCourses);
      setLoading(false);
    }

    if (component === 'Refund') {
      getRefund();
    }
  }, [myCourses, component]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      {loading && <Loading />}
      <CssBaseline />
      <AppBar
        position='fixed'
        className={
          (clsx(classes.appBar, {
            [classes.appBarShift]: open,
          }),
          'bg-dark')
        }
      >
        <Toolbar
          style={{
            marginLeft: '3rem',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <IconButton
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={clsx(classes.menuButton)}
          >
            <MenuIcon />
          </IconButton>
          <Link to='/' className={`${classes.name}`}>
            <i
              className='fa fa-graduation-cap'
              style={{ fontSize: '2rem', marginRight: '0.5rem' }}
            />
            Nerd Academy
          </Link>
          <Avatar>{user.username.toUpperCase().substring(0, 2)}</Avatar>
        </Toolbar>
      </AppBar>
      <Drawer
        variant='permanent'
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {
            // choose which sidebar to render based on user role
            user.type === 'Instructor' &&
              InstructorSideBar.map((item, index) => (
                <ListItem
                  button
                  key={index}
                  onClick={() => {
                    setComponent(item.title);
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItem>
              ))
          }
          {user.type === 'Corporate trainee' &&
            CorporateSideBar.map((item, index) => (
              <ListItem
                button
                key={index}
                onClick={() => {
                  setComponent(item.title);
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItem>
            ))}
          {user.type === 'Individual trainee' &&
            IndividualSideBar.map((item, index) => (
              <ListItem
                button
                key={index}
                onClick={() => {
                  setComponent(item.title);
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItem>
            ))}
        </List>
        <Divider />
        <ListItem
          button
          onClick={() => {
            setComponent('Settings');
          }}
        >
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary={'Settings'} />
        </ListItem>
      </Drawer>
      {!loading && (
        <main className={classes.content}>
          <div className={classes.biography}>
            <Avatar
              style={{
                width: '8rem',
                height: '8rem',
                fontSize: '2rem',
                backgroundColor: '#e0e0e0',
                color: 'black',
                marginBottom: '1rem',
              }}
            >
              {user.username.toUpperCase().substring(0, 2)}
            </Avatar>
            <p>{user.type === 'Instructor' && user?.biography}</p>
          </div>
          {component === 'My Courses' && user.type === 'Instructor' && (
            <InstructorProfile courses={courses}></InstructorProfile>
          )}
          {component === 'Refund' && (
            <>
              <h1>Your refund requests</h1>
              {refunds.map((refund) => (
                <Refund
                  key={refund._id}
                  refundMoney={refund.refundMoney}
                  courseName={
                    courses.find((course) => course._id === refund.course)
                      ?.title
                  }
                  state={refund.state}
                />
              ))}
            </>
          )}
          {component === 'Settings' && <Settings />}

          <br />
          <br />
          <Footer />
        </main>
      )}
    </div>
  );
}
