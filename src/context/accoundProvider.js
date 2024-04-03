import React, { createContext, useState } from 'react'
  

export const AccoundContext = createContext()
const AccoundProvider = ({children}) => {
    const [account,setAccount] = useState()
  return (
    <AccoundContext.Provider value={{account,setAccount}}>
    {children}
    </AccoundContext.Provider>
  )
}

export default AccoundProvider