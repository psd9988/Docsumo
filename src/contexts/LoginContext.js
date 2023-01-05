import React, { createContext, useState } from "react";

const LoginStateContext = createContext();

function LoginStateProvider({ children }) {
  const [loggedinUser, setLoggedinUser] = useState('');

  return (
    <LoginStateContext.Provider value={{ loggedinUser, setLoggedinUser }}>
      {children}
    </LoginStateContext.Provider>
  );
}

export { LoginStateContext, LoginStateProvider };