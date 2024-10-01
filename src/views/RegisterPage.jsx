import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';

const RegisterPage = () => {
    const { register } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const validaFormulario = async (e) => {
        e.preventDefault();
        
        // Validar formulario
        if (email.toLowerCase().trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
            Swal.fire({
                title: 'Error!',
                text: 'Debes llenar todos los campos',
                icon: 'error',
                confirmButtonText: 'Cerrar',
            });
        } else if (password !== confirmPassword || password.length < 6) {
            Swal.fire({
                title: 'Error!',
                text: 'El password y el password confirmation deben ser iguales y superior a 6 caracteres',
                icon: 'error',
                confirmButtonText: 'Cerrar',
            });
        } else {
            // Llamar al método register del contexto
            const result = await register(email, password);
            if (result) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Registro exitoso',
                    icon: 'success',
                    confirmButtonText: 'Cerrar',
                });
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Hubo un error en el registro. Inténtalo de nuevo.',
                    icon: 'error',
                    confirmButtonText: 'Cerrar',
                });
            }
        }

        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };

    return (
        <>
            <div className="d-flex justify-content-center align-items-center">
                <div
                    style={{ width: '25rem' }}
                    className="d-flex justify-content-center flex-column align-items-center border border-3 border-warning-subtle rounded-3 gap-3 mt-3 mb-3 pt-3 pb-3"
                >
                    <h1>Regístrate</h1>
                    <form onSubmit={validaFormulario}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">
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
                            <label htmlFor="exampleInputPassword1" className="form-label">
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
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">
                                Confirmar contraseña
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="confirmPass"
                                placeholder="Confirma tu contraseña"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
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
        </>
    );
};

export default RegisterPage;
