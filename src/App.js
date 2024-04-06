/* import React, { createContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPhone from './components/loginPhone'
import LoginDialog from './components/loginDialog'
import LoginOtp from './components/loginOtp'
import ChatDialog from './components/chatDialog'
import ProfileEdit from './components/profileEdit'
import SignUp from './components/signUp'

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
        <Route path='/signup' element={<SignUp />}></Route>
      </Routes>
    </userContext.Provider>
  )
}

export default App */





 import React, { useState } from 'react'
 import axios from 'axios'
import { GoogleOAuthProvider } from '@react-oauth/google'
import LoginDialog from './components/loginDialog'
import AccoundProvider from './context/accoundProvider'
import ChatDialog from './components/chatDialog'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleGoogleLogin = async () => {
    try {
      const response = await axios.get('http://localhost:4000/auth/google'); // Endpoint for initiating authentication in backend
      console.log(response.data); // Handle response data
      setIsLoggedIn(true); // Set login state to true
    } catch (error) {
      console.error('Error logging in with Google:', error);
    }
  };
  return (
    <GoogleOAuthProvider>
      <AccoundProvider>
      <LoginDialog onGoogleLogin={handleGoogleLogin} />
      </AccoundProvider>
      {isLoggedIn && <ChatDialog />} 
    </GoogleOAuthProvider>
  )
}

export default App 