import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("taskflow_user");

    if (savedUser) {
      return JSON.parse(savedUser);
    }

    return null;
  });

  function login(userData) {
    setUser(userData);

    localStorage.setItem(
      "taskflow_user",
      JSON.stringify(userData)
    );
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("taskflow_user");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}