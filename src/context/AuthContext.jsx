import { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    // Método de login
    const login = async (email, password) => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();

            if (response.ok) {
                setToken(data.token);
                setUser({ email: data.email });
                return true; // Retorna true si el login es exitoso
            } else {
                console.error(data.message);
                return false; // Retorna false si hay un error
            }
        } catch (error) {
            console.error('Error en login:', error);
            return false; // Retorna false en caso de error
        }
    };

    // Método de registro
    const register = async (email, password) => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();

            if (response.ok) {
                setToken(data.token);
                setUser({ email: data.email });
                return true; // Retorna true si el registro es exitoso
            } else {
                console.error(data.message);
                return false; // Retorna false si hay un error
            }
        } catch (error) {
            console.error('Error en register:', error);
            return false; // Retorna false en caso de error
        }
    };

    // Método de logout
    const logout = () => {
        setToken(null);
        setUser(null);
    };

    // Método para obtener el perfil
    const getProfile = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/me', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();

            if (response.ok) {
                setUser({ email: data.email });
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error al obtener perfil:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout, getProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
