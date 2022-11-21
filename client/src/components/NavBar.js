import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { makeStyles } from '@material-ui/core/styles';
import { Outlet, useNavigate } from 'react-router-dom';
import Search from './Search';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

const useStyles = makeStyles((theme) => ({
  name: {
    borderRadius: '15px',
    padding: '5px 15px',
  },
  nav: {
    display: 'block',
    height: '10vh',
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
}));

function NavBar() {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('user'));
  const profileList = useRef();
  const navigate = useNavigate();
  const [showProfileList, setShowProfileList] = useState(false);

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
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  };

  const expand = 'xxl';
  return (
    <nav>
      <Navbar
        key={expand}
        bg='light'
        expand={expand}
        className={`mb-3 bg-dark ${classes.nav}`}
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
                  {user?.username.slice(0, 2).toUpperCase()}
                </div>
                <div className={`${classes.profileListHeaderInfo}`}>
                  <p
                    style={{
                      fontSize: '1.2rem',
                      fontWeight: 'bold',
                      marginBottom: '0',
                    }}
                  >
                    {user?.username}
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
                <Link to='/myCourses'>
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
                <Link onClick={handleLogout}>
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
                </Link>
              </div>
            </div>
          )}
        </Container>
      </Navbar>
      <Outlet />
    </nav>
  );
}

export default NavBar;
