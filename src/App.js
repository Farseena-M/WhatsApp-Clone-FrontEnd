import React, { createContext, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginDialog from './components/loginDialog';
import ChatDialog from './components/chatDialog';
import SignUp from './components/signUp';
import SignIn from './components/signIn';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ProfileEdit from './components/profileEdit';
import Room from './components/chat/videoChat/room';

export const userContext = createContext();

const App = () => {
  const [user, setUser] = useState([]);
  const [login, setLogin] = useState(false);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [conversation, setConversation] = useState({});
  const [messages, setMessages] = useState([]);


  return (
    <userContext.Provider value={{
      user, setUser, login, setLogin, error, setError, open, setOpen,
      search, setSearch, conversation, setConversation,
      messages, setMessages
    }}>
      <Routes>
        <Route path='/' element={<LoginDialog />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/profile' element={<ProfileEdit />} />
        <Route path='/chat' element={<ChatDialog />} />
        <Route path='/room/:id' element={<Room />} />
      </Routes>
      <ToastContainer theme='colored' />
    </userContext.Provider>
  );
}

export default App;
