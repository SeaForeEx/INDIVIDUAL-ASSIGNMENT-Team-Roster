/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button, Image,
} from 'react-bootstrap';
import Cerebro from './Cerebro';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="navbar-text">
      <Container id="x-navbar">
        <Link passHref href="/">
          <Navbar.Brand><Image src="https://logos-world.net/wp-content/uploads/2022/01/X-Men-Logo-1968-700x394.png" alt="X-MEN Logo" width="15%" height="15%" /></Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/villains">
              <Nav.Link><Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR73CIoXtgI0TVkpLeH9mQD_h_KEekistnuVhh7HRyAozrv1fSr5BCAiIfu3t_qL-cq4yc&usqp=CAU" alt="Secret Link" width="1%" height="1%" /></Nav.Link>
            </Link>
            <Link passHref href="/">
              <Nav.Link>Members</Nav.Link>
            </Link>
            <Link passHref href="/member/new">
              <Nav.Link>Join</Nav.Link>
            </Link>
            <Link passHref href="/teams">
              <Nav.Link>X-Teams</Nav.Link>
            </Link>
            <Link passHref href="/team/new">
              <Nav.Link>New Team</Nav.Link>
            </Link>
            <Cerebro />
            <Button variant="danger" onClick={signOut}>Sign Out</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
