import React,{ createContext, useContext, useState } from "react";

const GeneralContext = createContext();

export default function ContextProvider({ children }) {

  const [barCode, setBarCode] = useState(null);
  const [contextKey, setContextKey] = useState(null);
    
  return <GeneralContext.Provider value={{barCode,setBarCode,contextKey,setContextKey}}>
        {children}
        </GeneralContext.Provider>;
}

export const useGeneralContext = ()=> useContext(GeneralContext)
