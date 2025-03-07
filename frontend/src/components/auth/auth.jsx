import React, { useState } from "react";
import { ArrowLeft, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { motion } from "framer-motion";
import logoHotizontal from "../../assets/logoHorizontalBlanco.png";
import useAuth from "../../hooks/auth";

const AuthSystem = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { view, setView, setRegisterData, registerData, register, checkPassword, setRecoverData, recoverData, checkPasswordRecovery, } = useAuth();

  // Variantes para animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  const formVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, delay: 0.2 },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.03, transition: { duration: 0.2 } },
    tap: { scale: 0.97, transition: { duration: 0.1 } },
  };

  // Componente para los inputs
  const InputField = ({ icon, type, placeholder, value, onChange }) => {
    const Icon = icon;

    return (
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-white">
          <Icon size={18} />
        </div>
        {type === "password"
          ? (
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full py-2 pl-10 pr-10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-gray-900 text-white"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
              />
              <button
                type="button"
                className="absolute inset-y-0 cursor-pointer right-0 flex items-center pr-3 text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          )
          : (
            <input
              type={type}
              className="w-full py-2 pl-10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-purple-900 transition-all bg-gray-900 text-white"
              placeholder={placeholder}
              value={value}
              onChange={onChange}
            />
          )}
      </div>
    );
  };

  // Componente para los botones principales
  const PrimaryButton = ({ children, onClick }) => (
    <motion.button
      className="w-full py-3 bg-purple-800 text-white rounded-lg font-medium shadow-md hover:bg-purple-900 transition-colors cursor-pointer"
      onClick={onClick}
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
    >
      {children}
    </motion.button>
  );

  // Componente para los enlaces secundarios
  const SecondaryLink = ({ children, onClick }) => (
    <motion.button
      className="text-white hover:text-pruple-800 hover:underline cursor-pointer transition-colors text-sm font-medium"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
    >
      {children}
    </motion.button>
  );

  // Vista de Login
  const LoginView = () => (
    <motion.div
      key="login"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full max-w-md"
    >
      <LoginForm />
    </motion.div>
  );

  const LoginForm = () => {
    const { setLoginData, loginData, login } = useAuth();
    return (
      <div>
      <div className="text-center mb-8">
      <h2 className="text-xl font-bold text-white mb-2">Iniciar Sesión</h2>
      <p className="text-white text-sm">Bienvenido de nuevo</p>
    </div>
        <div className="space-y-4">
            <InputField
                icon={User}
                type="text"
                placeholder="Nombre de usuario o email"
                value={loginData.username}
                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
            />
            <InputField
                icon={Lock}
                type="password"
                placeholder="Contraseña"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />
            <div className="flex justify-end">
                <SecondaryLink onClick={() => setView("recover")}>¿Olvidaste tu contraseña?</SecondaryLink>
            </div>
            <PrimaryButton onClick={login}>
                Iniciar Sesión
            </PrimaryButton>
            <div className="text-center">
                <p className="text-white text-sm">
                    ¿No tienes una cuenta?{" "}
                    <SecondaryLink onClick={() => setView("register")}>
                        Regístrate
                    </SecondaryLink>
                </p>
            </div>
        </div>
        </div>

    );
};

  // Vista de Registro
  const RegisterView = () => (
    <motion.div
      key="register"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full max-w-md"
    >
      <div className="flex items-center mb-8">
        <motion.button
          onClick={() => setView("login")}
          className="mr-4 p-2 rounded-full hover:bg-purple-600 cursor-pointer transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowLeft size={20} color="white" />
        </motion.button>
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Crear Cuenta</h2>
          <p className="text-white text-sm">
            Completa tus datos para registrarte
          </p>
        </div>
      </div>

      <motion.form variants={formVariants} className="space-y-4">
        <InputField
          icon={User}
          type="text"
          placeholder="Nombre completo"
          value={registerData.fullName}
          onChange={(e) => {
            setRegisterData({ ...registerData, fullName: e.target.value });
          }}
        />
        <InputField
          icon={User}
          type="text"
          placeholder="Institución educativa"
          value={registerData.institution}
          onChange={(e) => {
            setRegisterData({ ...registerData, institution: e.target.value });
          }}
        />
        <InputField
          icon={User}
          type="text"
          placeholder="Nombre de usuario"
          value={registerData.username}
          onChange={(e) => {
            setRegisterData({ ...registerData, username: e.target.value });
          }}
        />
        <InputField
          icon={Lock}
          type="password"
          placeholder="Contraseña"
          value={registerData.password}
          onChange={(e) => { setRegisterData({ ...registerData, password: e.target.value }); }}
        />
        <InputField
          icon={Lock}
          type="password"
          placeholder="Confirmar contraseña"
          value=""
          onChange={checkPassword}
        />

        <div className="mt-6">
          <PrimaryButton onClick={register}>
            Crear Cuenta
          </PrimaryButton>
        </div>
      </motion.form>
    </motion.div>
  );

  // Vista de Recuperar Contraseña - Buscar Cuenta
  const RecoverView = () => (
    <motion.div
      key="recover"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full max-w-md"
    >
      <div className="flex items-center mb-8">
        <motion.button
          onClick={() => setView("login")}
          className="mr-4 p-2 rounded-full hover:bg-purple-600 cursor-pointer transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowLeft size={20} color="white" />
        </motion.button>
        <div>
          <h2 className="text-xl font-bold text-white mb-1">
            Recuperar Contraseña
          </h2>
          <p className="text-white text-sm">Busca tu cuenta</p>
        </div>
      </div>

      <motion.form variants={formVariants} className="space-y-4">
        <p className="text-white mb-4 text-sm">
          Ingresa tu nombre de usuario para buscar tu contraseña.
        </p>

        <InputField
          icon={User}
          type="text"
          placeholder="Nombre de usuario o email"
          value={recoverData.username}
          onChange={(e) => {
            setRecoverData({ ...recoverData, username: e.target.value });
          }}
        />

        <div className="mt-6">
          <PrimaryButton onClick={() => setView("resetPassword")}>
            Buscar Cuenta
          </PrimaryButton>
        </div>
      </motion.form>
    </motion.div>
  );

  // Vista de Restablecer Contraseña
  const ResetPasswordView = () => (
    <motion.div
      key="resetPassword"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full max-w-md"
    >
      <div className="flex items-center mb-8">
        <motion.button
          onClick={() => setView("recover")}
          className="mr-4 p-2 rounded-full hover:bg-purple-600 cursor-pointer transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowLeft size={20} color="white" />
        </motion.button>
        <div>
          <h2 className="text-xl font-bold text-white mb-1">
            Nueva Contraseña
          </h2>
          <p className="text-white">Para la cuenta: {username}</p>
        </div>
      </div>

      <motion.form variants={formVariants} className="space-y-4">
        <p className="text-white text-sm mb-4">
          Crea una nueva contraseña segura que no uses en otros sitios.
        </p>

        <InputField
          icon={Lock}
          type="password"
          placeholder="Nueva contraseña"
          value=""
          onChange={(e) => { setRecoverData({ ...recoverData, password: e.target.value }); }}
        />

        <InputField
          icon={Lock}
          type="password"
          placeholder="Confirmar nueva contraseña"
          value=""
          onChange={checkPasswordRecovery}
        />

        <div className="mt-6">
          <PrimaryButton
            onClick={() => {
              alert("¡Contraseña cambiada con éxito!");
              setView("login");
            }}
          >
            Cambiar Contraseña
          </PrimaryButton>
        </div>
      </motion.form>
    </motion.div>
  );

  // Renderiza la vista apropiada
  const renderView = () => {
    switch (view) {
      case "login":
        return <LoginView />;
      case "register":
        return <RegisterView />;
      case "recover":
        return <RecoverView />;
      case "resetPassword":
        return <ResetPasswordView />;
      default:
        return <LoginView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-4">
      <div className="bg-gray-800 rounded-xl shadow-xl p-8 w-full max-w-sm transition-all">
        {renderView()}
      </div>
      <div className="flex justify-center items-center p-2">
        <img
          src={logoHotizontal}
          alt="logo"
          className="w-1/4"
          style={{ filter: "drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5))" }}
        />
      </div>
    </div>
  );
};

export default AuthSystem;
