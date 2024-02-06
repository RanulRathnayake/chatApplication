import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
/* import {LinkContainer} from "react-router-bootstrap"; */
import React from "react";
import {Link} from "react-router-dom";
import Logo from "../assets/Logo Chat app.png";
import {useSelector} from "react-redux";
function Navigation() {
    const user = useSelector(state => state.user);
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Link to="/">
                    <Navbar.Brand >
                        <img src={Logo} style={{width:50 , height:50}} alt=''/>
                    </Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {!user && (
                            <Link to="/login">
                                <Nav.Link>Login</Nav.Link>
                            </Link>
                        )}
                        <Link to="/signup">
                            <Nav.Link>Sign Up</Nav.Link>
                        </Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item><NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;