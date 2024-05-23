import React, { createContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginDialog from './components/loginDialog';
import ChatDialog from './components/chatDialog';
import SignUp from './components/signUp';
import SignIn from './components/signIn';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ProfileEdit from './components/profileEdit';
import Peer from 'peerjs';
import { GLOBALTYPES } from './redux/action/globalType';

export const userContext = createContext();

const App = () => {


  const [user, setUser] = useState([]);
  const [login, setLogin] = useState(false);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [conversation, setConversation] = useState({});
  const [messages, setMessages] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const newPeer = new Peer(undefined, {
      host: '/',
      port: '3001'
    });
    newPeer.on('open', id => {
      console.log('PeerJS connected with ID:', id);
      dispatch({ type: GLOBALTYPES.PEER, payload: newPeer });
    });
    newPeer.on('error', err => {
      console.error('PeerJS connection error:', err);
    });
  }, [dispatch]);
  return (
    <userContext.Provider value={{
      user, setUser, login, setLogin, error, setError, open, setOpen,
      search, setSearch, conversation, setConversation,
      messages, setMessages
    }}>
          <Routes>
            {/* <Route path='/' element={<LoginDialog />} /> */}
            <Route path='/' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/profile' element={<ProfileEdit />} />
            <Route path='/chat' element={<ChatDialog />} />
          </Routes>
          

      <ToastContainer theme='colored' />
    </userContext.Provider>
  );
};

export default App;
