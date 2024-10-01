import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Importar el contexto de autenticación

const LoginPage = () => {
  const { login } = useContext(AuthContext); // Obtener el método login del contexto
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const validaFormulario = async (e) => {
    e.preventDefault();

    // Validación de los campos
    if (email.toLowerCase().trim() === "" || password.trim() === "") {
      Swal.fire({
        title: "Error!",
        text: "Todos los campos deben ser completados",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
      return;
    }

    if (password.length < 6) {
      Swal.fire({
        title: "Error!",
        text: "El password debe ser superior a 6 caracteres",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
      return;
    }

    // Intentar el login usando el contexto
    const result = await login(email, password);
    if (result) {
      Swal.fire({
        title: "Success!",
        text: "Haz iniciado sesión correctamente",
        icon: "success",
        confirmButtonText: "Cerrar",
      });
      navigate("/Profile"); // Redireccionar al perfil si el login es exitoso
    } else {
      Swal.fire({
        title: "Error!",
        text: "Email o contraseña incorrectos",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    }

    setEmail("");
    setPassword("");
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div
          style={{ width: "25rem" }}
          className="d-flex justify-content-center flex-column align-items-center border border-3 border-warning-subtle rounded-3 gap-3 mt-3 mb-3 pt-3 pb-3"
        >
          <h1>Inicio de sesión</h1>
          <div>
            <form onSubmit={validaFormulario}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Ingresa tu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="pass" className="form-label">
                  Contraseña
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="pass"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-dark">
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
