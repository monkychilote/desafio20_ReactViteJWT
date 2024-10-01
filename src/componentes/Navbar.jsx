import React, { useContext } from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { formatCurrency } from "../helpers/format";
import { Link, NavLink, useNavigate } from "react-router-dom"; // Importar useNavigate
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext"; // Importar AuthContext

function NavbarApp() {
  const { amount } = useContext(CartContext);
  const { token, logout } = useContext(AuthContext); // Obtener el método logout del contexto
  const navigate = useNavigate(); // Hook para redirección

  const setActiveClass = ({ isActive }) =>
    isActive
      ? "text-warning mt-2 pe-2 text-decoration-none"
      : "text-white mt-2 pe-2 text-decoration-none";

  // Función para manejar el logout
  const handleLogout = () => {
    logout(); // Llamar al método logout del contexto
    navigate("/"); // Redirigir al inicio después de cerrar sesión
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container className="d-flex justify-content-between align-items-center">
        <Nav className="d-flex align-items-center gap-2">
          <Navbar.Brand as={Link} to="/">
            Pizzería Mamma Mia!
          </Navbar.Brand>

          {/* Usar `as={Link}` para los botones */}
          <Button className="btn-sm" variant="outline-light">
            <NavLink to="/" className={setActiveClass}>
              🍕Home
            </NavLink>
          </Button>

          {token ? (
            <>
              <Button className="btn-sm" variant="outline-light">
                <NavLink to="/profile" className={setActiveClass}>
                  🔓Profile
                </NavLink>
              </Button>

              <Button className="btn-sm" variant="outline-light" onClick={handleLogout}>
                🔒Logout
              </Button>

              {/* Botón del carrito */}
              <Button className="btn-sm" variant="outline-info">
                <NavLink to="/Cart" className={setActiveClass}>
                  🛒Total: {formatCurrency(amount)}
                </NavLink>
              </Button>
            </>
          ) : (
            <>
              <Button className="btn-sm" variant="outline-light">
                <NavLink to="/LoginPage" className={setActiveClass}>
                  🔐Login
                </NavLink>
              </Button>
              <Button className="btn-sm" variant="outline-light">
                <NavLink to="/registerPage" className={setActiveClass}>
                  🔐Register
                </NavLink>
              </Button>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavbarApp;
