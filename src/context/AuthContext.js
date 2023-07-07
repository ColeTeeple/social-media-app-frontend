import React, { useState, useContext } from "react";

const AuthContext = React.createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

export const AuthContextProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};
