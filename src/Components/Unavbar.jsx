import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Unavbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/"); // Redirect to login/home page
  };

  return (
    <Navbar variant="dark" expand="lg" style={{ backgroundColor: "blue" }}>
      <Container>
        <Navbar.Brand>
          <Link to="/uhome" style={{ color: "white", textDecoration: "none" }}>
            Music App
          </Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Link to="/uhome" className="nav-link" style={{ color: "white" }}>
              Home
            </Link>
            <Link to="/songs" className="nav-link" style={{ color: "white" }}>
              Songs
            </Link>
            <Link to="/favorities" className="nav-link" style={{ color: "white" }}>
              Favorites
            </Link>
            <Link to="/playlist" className="nav-link" style={{ color: "white" }}>
              Playlist
            </Link>

            {user ? (
              <>
                <span style={{ color: "white", paddingLeft: "10px" }}>
                  ({user.name})
                </span>
                <button
                  className="btn btn-danger"
                  style={{ marginLeft: "10px" }}
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/" className="nav-link" style={{ color: "white" }}>
                Login
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Unavbar;
