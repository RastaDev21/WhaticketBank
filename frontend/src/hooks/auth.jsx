import { createContext, useContext, useState, useEffect } from "react";

import { api } from "../services/api";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [data, setData] = useState({});

  async function signIn({ cpf, password }) {
    try {
      const response = await api.post("/sessions", { cpf, password });
      const { user, token } = response.data;

      localStorage.setItem("@whaticketbank:user", JSON.stringify(user));
      localStorage.setItem("@whaticketbank:token", token);

      api.defaults.headers.common[`Authorization`] = `Bearer ${token}`;

      setData({ user, token });
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Não foi possível fazer login");
      }
    }
  }

  function signOut() {
    localStorage.removeItem("@whaticketbank:user");
    localStorage.removeItem("@whaticketbank:token");

    setData({});
  }

  async function updateProfile({ user }) {
    try {
      await api.put("/users", user);
      localStorage.setItem("@whaticketbank:user", JSON.stringify(user));
      setData({ user, token: data.token });

      alert("Perfil atualizado");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Não foi possível atualizar o perfil");
      }
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("@whaticketbank:token");
    const user = localStorage.getItem("@whaticketbank:user");

    if (token && user) {
      api.defaults.headers.common[`Authorization`] = `Bearer ${token}`;
      setData({
        token,
        user: JSON.parse(user),
      });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        updateProfile,
        user: data.user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
