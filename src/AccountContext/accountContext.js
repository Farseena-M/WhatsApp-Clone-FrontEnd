/* import React, { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

export const useAuthContext = () =>{
    return useContext(AuthContext)
}

export const AuthContextProvider = ({ children }) => {
  const [account, setAccount] = useState(JSON.parselocalStorage.getItem('chat-user') || null); 

  return (
    <AuthContext.Provider value={{ account, setAccount }}>
      {children}
    </AuthContext.Provider>
  );
};

 */