import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, NavbarBrand, NavbarCollapse, Badge, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import {LinkContainer} from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import logo from '../assets/logo.png';
import { toast } from 'react-toastify';
import SearchBox from './SearchBox';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
        toast.error(err?.data?.message || err.error);
    }
  }

  return (
    <header>
        <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
            <Container>
                <LinkContainer to="/">
                    <NavbarBrand>
                        <img src={logo} alt="The ProShop" />
                        ProShop
                    </NavbarBrand>
                </LinkContainer>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <NavbarCollapse id="basic-navbar-nav">
                    <Nav className='ms-auto'>
                        <SearchBox />
                        <LinkContainer to="/cart">
                            <Nav.Link><FaShoppingCart /> Cart
                            {cartItems.length > 0 && (
                                <Badge pill bg="success" style={{marginLeft: '5px'}}>          {cartItems.reduce((a, c) => a + c.qty, 0)}
                                </Badge>
                            )}
                            </Nav.Link>
                        </LinkContainer>
                            { userInfo ? (
                                <NavDropdown title={userInfo.name} id="username">
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to="/login">
                                    <Nav.Link><FaUser /> Sign In</Nav.Link>
                                </LinkContainer>
                            )}
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title="Admin" id="adminmenu">
                                    <LinkContainer to="/admin/productlist">
                                        <NavDropdown.Item>Products</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/userlist">
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/orderlist">
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>

                            )}
                    </Nav>
                </NavbarCollapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header
