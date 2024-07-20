import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import styles from "../styles/Layout.module.css";

/**
 * Layout component for our pages, contains a nav bar with the current signed in user displayed
 * @param page a string so we know which menu item to highlight
 * @param children the contents of the page
 */
export default function Layout({
  children,
  page,
}: {
  children: React.ReactNode;
  page: string;
}) {

  return (
    <div>
      <Navbar bg="light" fixed="top" className="mb-3 px-5" expand="sm">
        <Navbar.Brand href="/about">Money Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Item>
              <Nav.Link href="/display-transactions" active={page === "transactions"}>
                Transactions
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/organise-transactions" active={page === "organise"}>
                Organise
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/statistics" active={page === "stats"}>
                Stats
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <main>
        <Container className={styles.layoutContainer}>{children}</Container>
      </main>
    </div>
  );
}
