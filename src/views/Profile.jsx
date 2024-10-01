import React, { useContext } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext"; // Importar el contexto de autenticación
import "./Profile.css"; // Importar el archivo CSS
import { useNavigate } from "react-router-dom"; // Para redirigir después de cerrar sesión

const Profile = () => {
  const { user, logout } = useContext(AuthContext); // Obtener el usuario y logout del contexto
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Llamar al método logout del contexto
    navigate("/"); // Redireccionar al inicio
  };

  return (
    <Container className="container-full-height">
      <Card border="warning" className="profile-card">
        <Card.Body className="profile-card-body">
          <Card.Title className="text-center pb-3 pt-3">
            <strong>{user ? user.email : "Usuario no autenticado"}</strong> {/* Mostrar el email del usuario */}
          </Card.Title>
          <Button
            className="btn btn-dark"
            onClick={handleLogout} // Asignar la función de logout al botón
          >
            Cerrar sesión
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Profile;
