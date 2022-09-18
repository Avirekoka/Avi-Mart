import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import AppNavbar from 'react-bootstrap/Navbar';

function Header() {

  const persistedData = JSON.parse(localStorage.getItem("cart_data"));

  return (
    <AppNavbar bg="light" expand="lg" variant="light">
      <Container>
        <AppNavbar.Brand href="/">Home</AppNavbar.Brand>
        <Nav>
            <Nav.Link href="/cart">
              Cart : {persistedData !== null ? persistedData.length : 0}
            </Nav.Link>
        </Nav>
      </Container>
    </AppNavbar>
  );
}

export default Header;