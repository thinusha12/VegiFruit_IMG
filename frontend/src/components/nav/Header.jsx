import { useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './styles.css';

const Header = () => {

  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate('/');
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <img src={`${process.env.PUBLIC_URL}/favicon.ico`} alt="logo" className="logo" onClick={() => handleOnClick()} />
          <LinkContainer to='/'>
            <Navbar.Brand >VegiFruit</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className='ms-auto'>
              {(localStorage.getItem('user') === null || localStorage.getItem('type') === 'USER') && (
                <LinkContainer to='/cart'>
                  <Nav.Link >
                    <i className='fas fa-shopping-cart'></i> Cart
                  </Nav.Link>
                </LinkContainer>
              )}
              {(localStorage.getItem('type') === 'ADMIN') && (
                <LinkContainer to='/products'>
                  <Nav.Link >
                    <i class="fas fa-seedling"></i> Products
                  </Nav.Link>
                </LinkContainer>
              )}
              {(localStorage.getItem('type') === 'ADMIN') && (
                <LinkContainer to='/users'>
                  <Nav.Link >
                    <i class="fas fa-users"></i> Users
                  </Nav.Link>
                </LinkContainer>
              )}
              {(localStorage.getItem('user') === null) && (
                <LinkContainer to='/login'>
                  <Nav.Link >
                    <i className='fas fa-user'></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {(localStorage.getItem('user') !== null) && (
                <LinkContainer to='/profile'>
                  <Nav.Link >
                    <i className='fas fa-user'></i> {localStorage.getItem('name')}
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header

