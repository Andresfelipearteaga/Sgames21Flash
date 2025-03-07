import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
const useAuth = () => {

    // Objeto para datos de registro
    const [registerData, setRegisterData] = useState({
        fullName: '',
        institution: '',
        username: '',
        password: ''
    });

    // Objeto para datos de login
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });

    // Objeto para datos de recuperación de contraseña
    const [recoverData, setRecoverData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        resetToken: ''
    });

    // Control de vista
    const [view, setView] = useState('login');

    // Modal de error
    const [modalError, setModalError] = useState({ show: false, message: '' });

    // Mostrar modal de error
    const showModalError = (message) => {
        setModalError({ show: true, message });
    };

    // Ocultar modal de error
    const hideModalError = () => {
        setModalError({ show: false, message: '' });
    };



// Login
const login = async () => {
    // Validación de campos vacíos
    if (loginData.username.trim() === '' || loginData.password.trim() === '') {
        toast.error('El nombre de usuario y la contraseña son obligatorios');
        return;
    }

    try {
        const response = await axios.post('http://localhost:5000/api/user/login', {
            username: loginData.username,
            password: loginData.password,
        });

        if (response.data.success) {
            toast.success('Inicio de sesión exitoso');
            // Aquí puedes guardar token o redirigir
        } else {
            // Si tu backend manda success: false con algún mensaje (en caso de error controlado)
            toast.error(response.data.message || 'Error al iniciar sesión');
        }
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Error en el servidor';
        toast.error(errorMessage);
        console.error('Error en login', error);
    }
};


    // Registro
    const register = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/register', {
                fullName: registerData.fullName,
                institution: registerData.institution,
                username: registerData.username,
                password: registerData.password,
            });
            console.log(response);
            alert('Registro exitoso');
            setView('login');
        } catch (error) {
            showModalError('Error al registrar el usuario. Inténtalo más tarde.');
            console.error('Error en register', error);
        }
    };

    const checkPassword = (e) => {
        if (registerData.password !== e.target.value) {
            showModalError('Las contraseñas no coinciden.');
        }
    };

    // Buscar usuario para recuperación de contraseña
    const checkUserExists = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/checkUser', { 
                username: recoverData.username 
            });

            if (response.data.exists) {
                setRecoverData(prev => ({
                    ...prev,
                    resetToken: response.data.resetToken // Asumiendo que el backend lo devuelve
                }));
                setView('resetPassword');
            } else {
                showModalError('El usuario no existe. Por favor verifica el nombre de usuario.');
            }
        } catch (error) {
            showModalError('Error al buscar la cuenta. Inténtalo más tarde.');
            console.error('Error en checkUserExists', error);
        }
    };

    // Cambiar contraseña
    const changePassword = async () => {
        if (recoverData.password !== recoverData.confirmPassword) {
            showModalError('Las contraseñas no coinciden.');
            return;
        }

        try {
            await axios.post('http://localhost:5000/api/resetPassword', {
                username: recoverData.username,
                newPassword: recoverData.password,
                token: recoverData.resetToken
            });

            alert('¡Contraseña cambiada con éxito!');
            setView('login');
        } catch (error) {
            showModalError('Error al cambiar la contraseña. Inténtalo más tarde.');
            console.error('Error en changePassword', error);
        }
    };

    return {
        registerData,
        setRegisterData,
        loginData,
        setLoginData,
        recoverData,
        setRecoverData,
        view,
        setView,
        modalError,
        hideModalError,
        login,
        register,
        checkUserExists,
        changePassword,
        checkPassword
    };
};

export default useAuth;
