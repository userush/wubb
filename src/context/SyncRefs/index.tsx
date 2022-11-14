// @ts-nocheck
import React, { createContext, useEffect, useState } from "react";

export const SyncRefsContext = createContext<any>([]);

const SyncRefsProvider = ({ children }) => {
  const [connectedAddrs, setConnectedAddrs] = useState([]);

  useEffect(() => {
    
  }, []);

  return (
    <SyncRefsContext.Provider value={{ connectedAddrs }}>
      {children}
    </SyncRefsContext.Provider>
  );
};

export default SyncRefsProvider;
