import React,{ createContext, useContext, useState } from "react";

const LoginContext = createContext();

export default function LoginProvider({ children }) {

  const [isLogedIn, setLogedIn] = useState(null);
    
  return <LoginContext.Provider value={{isLogedIn,setLogedIn}}>
        {children}
        </LoginContext.Provider>;
}

export const useLogin = ()=> useContext(LoginContext)
