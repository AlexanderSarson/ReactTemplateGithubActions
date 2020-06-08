import React, { useReducer, createContext } from "react";
export const AuthContext = createContext();

const initialState = {
  isLoggedIn: false,
  isAdmin: false,
  username: "",
  roles: []
};

const AUTH_LOGIN = "AUTH_LOGIN";
const AUTH_LOGOUT = "AUTH_LOGOUT";

const reducer = (state, action) => {
  switch (action.type) {
    case AUTH_LOGIN:
      return {
        isLoggedIn: action.payload.isLoggedIn,
        isAdmin: action.payload.roles.includes("admin"),
        username: action.payload.username,
        roles: action.payload.roles
      };
    case AUTH_LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [auth, dispatch] = useReducer(reducer, initialState);

  const login = ({ username, roles }) => {
    dispatch({
      type: AUTH_LOGIN,
      payload: {
        isLoggedIn: true,
        username: username,
        roles: roles
      }
    });
  };

  const logout = () => {
    dispatch({
      type: AUTH_LOGOUT
    });
  };

  const value = { auth, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
