import React from "react";

export const LoginContext = React.createContext({
  loggedIn: false,
  toggleLogin: (token) => {},
  toggleLogout: () => {},
  token:""
});