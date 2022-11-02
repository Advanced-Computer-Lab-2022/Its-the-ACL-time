import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { makeStyles } from '@material-ui/core/styles';
import { Outlet } from 'react-router-dom';
import CountrySelector from './CountrySelector';
import Search from './Search';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  name: {
    borderRadius: '15px',
    padding: '5px 15px',
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

function NavBar() {
  const classes = useStyles();
  const expand = 'xxl';
  return (
    <nav className={`${classes.nav}`}>
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
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement='end'
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                Offcanvas
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className='justify-content-end flex-grow-1 pe-3'>
                <Nav.Link href='#action1'>Home</Nav.Link>
                <Nav.Link href='#action2'>Link</Nav.Link>
                <NavDropdown
                  title='Dropdown'
                  id={`offcanvasNavbarDropdown-expand-${expand}`}
                >
                  <NavDropdown.Item href='#action3'>Action</NavDropdown.Item>
                  <NavDropdown.Item href='#action4'>
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href='#action5'>
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <Outlet />
    </nav>
  );
}

export default NavBar;
