import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { makeStyles } from '@material-ui/core/styles';
import { Outlet, useNavigate } from 'react-router-dom';
import Search from './Search';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useAppContext } from '../context/App/appContext';
import { Box, Button, MenuItem, Select } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  name: {
    borderRadius: '15px',
    padding: '5px 15px',
  },
  nav: {
    display: 'block',
    height: 'auto',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 0 10px rgba(0,0,0,0.5)',
    paddingLeft: '2rem',
    paddingRight: '2rem',
  },
  profileIcon: {
    minWidth: '2.5rem',
    height: '2.5rem',
    borderRadius: '50%',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.2rem',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.8)',
    },
    boxShadow: '0 0 10px rgba(0,0,0,0.5)',
  },
  profileList: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    top: '12vh',
    right: '2rem',
    width: '15rem',
    backgroundColor: 'white',
    borderRadius: '3px',
    boxShadow: '0 0 10px rgba(0,0,0,0.5)',
    padding: '1rem',
  },
  profileListHeader: {
    display: 'flex',
  },
  profileListHeaderInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: '1.5rem',
  },
  profileListBody: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    '& a': {
      textDecoration: 'none',
      fontFamily: 'sans-serif',
      color: 'black',
      fontSize: '1rem',
      fontWeight: '350',
      padding: '0.5rem 0',
      '&:hover': {
        color: 'rgba(0,0,0,0.5)',
      },
    },
    marginLeft: '1.5rem',
  },
  profileListItem: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '0.5rem 0',
    '&:hover': {
      color: 'rgba(0,0,0,0.5)',
    },
  },

  identity: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  btn: {
    width: '5rem',
    height: '2rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid grey',
    backgroundColor: 'rgb(240, 237, 237)',
    color: 'black',
    textDecoration: 'none',
    '&:hover': {
      backgroundColor: 'rgba(135, 132, 132, 0.5)',
    },
    marginRight: '1rem',
  },
}));

const languages = [
  'Arabic',
  'English',
  'Spanish',
  'French',
  'German',
  'Italian',
  'Russian',
  'Chinese',
  'Japanese',
  'Korean',
  'Other',
];

function NavBar() {
  const classes = useStyles();
  const { user, resetUser } = useAppContext();
  const profileList = useRef();
  const navigate = useNavigate();
  const [showProfileList, setShowProfileList] = useState(false);
  const [openLanguages, setOpenLanguages] = useState(false);
  const [language, setLanguage] = useState('');

  useEffect(() => {
    let mouseDownHandler = (e) => {
      if (profileList.current && !profileList.current.contains(e.target)) {
        setShowProfileList(false);
      }
    };
    document.addEventListener('mousedown', mouseDownHandler);

    return () => {
      document.removeEventListener('mousedown', mouseDownHandler);
    };
  });

  const handleLogout = () => {
    console.log('logout');
    resetUser();
    navigate('/landing');
  };

  const expand = 'xxl';
  return (
    <>
      <Navbar
        key={expand}
        bg='light'
        expand={expand}
        className={`py-2 bg-dark ${classes.nav}`}
        fixed='top'
        size='lg'
      >
        <Container fluid>
          <Link to='/' className='navbar-brand text-light'>
            <Navbar.Brand href='#' className={`bg-light ${classes.name}`}>
              Nerd
            </Navbar.Brand>
          </Link>
          <Search />
          {user && (
            <>
              <div
                className={`${classes.profileIcon}`}
                onClick={() => setShowProfileList(!showProfileList)}
              >
                {user?.username.slice(0, 2).toUpperCase()}
              </div>
              {user && showProfileList && (
                <div className={`${classes.profileList}`} ref={profileList}>
                
                  <div className={`${classes.profileListHeader}`}>
                 
                    <div
                      className={`${classes.profileIcon}`}
                      style={{ backgroundColor: 'black', color: 'white' }}
                    >
                     <Link to='/profile'>
                      {user?.username.slice(0, 2).toUpperCase()}
                      </Link>
                    </div>
                    <div className={`${classes.profileListHeaderInfo}`}>
                    
                      <p
                        style={{
                          fontSize: '1.2rem',
                          fontWeight: 'bold',
                          marginBottom: '0',
                        }}
                      >
                        {user?.username.slice(0, 10)}
                      </p>
                      <p
                        style={{
                          fontSize: '0.8rem',
                          width: '10rem',
                          fontWeight: '300',
                          marginBottom: '0',
                          overflow: 'hidden',
                        }}
                      >
                        {user?.email.slice(0, 18)}
                      </p>
                      
                    </div>
                  </div>
                  <div
                    style={{
                      width: '100%',
                      height: '1px',
                      backgroundColor: 'rgba(0,0,0,0.2)',
                      margin: '1rem 0',
                    }}
                    
                  ></div>
                  <div className={`${classes.profileListBody}`}>
                    <Link to='/profile/myCourses'>
                      {/* learning icon */}
                      <span className={`${classes.profileListItem}`}>
                        <i
                          className='fas fa-book-open'
                          style={{ marginRight: '0.5rem' }}
                        ></i>
                        <p
                          style={{
                            fontSize: '1rem',
                            fontWeight: '350',
                            marginBottom: '0',
                            marginLeft: '0.5rem',
                          }}
                        >
                          My Courses
                        </p>
                      </span>
                    </Link>
                    <Link to='/cart'>
                      <span className={`${classes.profileListItem}`}>
                        <i
                          className='fas fa-shopping-cart'
                          style={{ marginRight: '0.5rem' }}
                        ></i>
                        <p
                          style={{
                            fontSize: '1rem',
                            fontWeight: '350',
                            marginBottom: '0',
                            marginLeft: '0.5rem',
                          }}
                        >
                          Cart
                        </p>
                      </span>
                    </Link>
                    <Box
                      onClick={handleLogout}
                      style={{
                        cursor: 'pointer',
                      }}
                    >
                      <span className={`${classes.profileListItem}`}>
                        <i
                          className='fas fa-sign-out-alt'
                          style={{ marginRight: '0.5rem' }}
                        ></i>
                        <p
                          style={{
                            fontSize: '1rem',
                            fontWeight: '350',
                            marginBottom: '0',
                            marginLeft: '0.5rem',
                          }}
                        >
                          Logout
                        </p>
                      </span>
                    </Box>
                  </div>
                </div>
              )}
            </>
          )}

          {!user && (
            <div className={classes.identity}>
              <Link to='/login' className={classes.btn}>
                <Button>Login</Button>
              </Link>
              <Link to='/register' className={classes.btn}>
                <Button>Signup</Button>
              </Link>
              <Button
                className={classes.btn}
                onClick={() => setOpenLanguages(true)}
              >
                <i className='fas fa-globe'></i>
              </Button>
              {openLanguages && (
                <Select
                  labelId='demo-controlled-open-select-label'
                  id='demo-controlled-open-select'
                  open={openLanguages}
                  onClose={() => setOpenLanguages(false)}
                  onOpen={() => setOpenLanguages(true)}
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  {languages.map((language) => (
                    <MenuItem value={language}>{language}</MenuItem>
                  ))}
                </Select>
              )}
            </div>
          )}
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

export default NavBar;
