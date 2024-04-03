/* import React, { createContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPhone from './components/loginPhone'
import LoginDialog from './components/loginDialog'
import LoginOtp from './components/loginOtp'
import ChatDialog from './components/chatDialog'
import ProfileEdit from './components/profileEdit'

export const userContext = createContext()
const App = () => {
  return (
    <userContext.Provider>
      <Routes>
        <Route path='/' element={<LoginDialog />}></Route>
        <Route path='/loginphone' element={<LoginPhone />}></Route>
        <Route path='/loginOtp' element={<LoginOtp />}></Route>
        <Route path='/profile' element={<ProfileEdit />}></Route>
        <Route path='/chat' element={<ChatDialog />}></Route>
      </Routes>
    </userContext.Provider>
  )
}

export default App
 */




import React from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google'
import LoginDialog from './components/loginDialog'
import AccoundProvider from './context/accoundProvider'

const App = () => {
  const clientId = '999414346006-jcfg2t3tcv8es64qcuviahi89bseqsmr.apps.googleusercontent.com'
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AccoundProvider>
      <LoginDialog />
      </AccoundProvider>
    </GoogleOAuthProvider>
  )
}

export default App