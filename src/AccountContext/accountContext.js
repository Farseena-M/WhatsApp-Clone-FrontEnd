import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuthContext = () =>{
    return useContext(AuthContext)
}

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('chat-user')) || null); 
  const [updatedAuthUser, setUpdatedAuthUser] = useState(JSON.parse(localStorage.getItem('user')) || null); 
    
  return (
    <AuthContext.Provider value={{ authUser, setAuthUser ,updatedAuthUser, setUpdatedAuthUser}}>
      {children}
    </AuthContext.Provider>
  );
};

