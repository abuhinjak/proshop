import { Navbar, Nav, Container, NavbarBrand, NavbarCollapse, Badge } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import {LinkContainer} from 'react-router-bootstrap';
import { useSelector } from 'react-redux';
import logo from '../assets/logo.png';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);


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
                        <LinkContainer to="/cart">
                            <Nav.Link><FaShoppingCart /> Cart
                            {cartItems.length > 0 && (
                                <Badge pill bg="success" style={{marginLeft: '5px'}}>          {cartItems.reduce((a, c) => a + c.qty, 0)}
                                </Badge>
                            )}
                            </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/login">
                            <Nav.Link><FaUser /> Sign In</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </NavbarCollapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header
