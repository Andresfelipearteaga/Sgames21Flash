import { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userDataPhase, setUserDataPhase] = useState({});

  return (
    <UserContext.Provider value={{ user, setUser, userDataPhase, setUserDataPhase }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook para acceder al contexto
export const useUser = () => {
    return useContext(UserContext);
};