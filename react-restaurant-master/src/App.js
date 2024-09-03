import "./App.css";
import { Link, Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Services from "./pages/Services";
import Products from "./pages/Products";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Reservations from "./pages/Reservations";
import Contact from "./pages/Contact";
import MyReservations from "./pages/MyReservations ";
import CommentsHistory from "./pages/CommentsHistory";
import Facility from "./pages/facilities";
function App() {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <div>
      <Navbar expand="lg" className="fixed-top bg-body-tertiary shadow">
        <Container>
          <Navbar.Brand>
            <Link to="/" className="navbar-brand text-success fw-semibold">
              ABC Restaurant
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto justify-content-end w-100">
              <Nav.Link href="/" className="active text-uppercase">
                Home
              </Nav.Link>
              <Nav.Link href="/menu" className="text-uppercase">
                Menu
              </Nav.Link>
              <Nav.Link href="/services" className="text-uppercase">
                Services
              </Nav.Link>
              <Nav.Link href="/products" className="text-uppercase">
                Products
              </Nav.Link>
              <Nav.Link href="/about" className="text-uppercase">
                About
              </Nav.Link>
              <Nav.Link href="/facility" className="text-uppercase">
                Facility
              </Nav.Link>

              {!isLoggedIn && (
                <>
                  <Nav.Link href="/register" className="text-uppercase">
                    Register
                  </Nav.Link>
                </>
              )}
              <Nav.Link href="/reservations" className="text-uppercase">
                Reservations
              </Nav.Link>
              <Nav.Link href="/contact" className="text-uppercase">
                Contact
              </Nav.Link>
              <Nav.Link href="/login" className="text-uppercase">
                Login
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/facility" element={<Facility />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my-reservations" element={<MyReservations />} />
        {!isLoggedIn && <Route path="/register" element={<Register />} />}
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/comments-history" element={<CommentsHistory />} />
      </Routes>

      <footer className="bg-body-tertiary">
        <p className="p-3 m-0 text-center">copyright @ ABC Restaurant</p>
      </footer>
    </div>
  );
}

export default App;
