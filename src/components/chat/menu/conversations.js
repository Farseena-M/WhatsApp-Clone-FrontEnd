import React, { useContext, useState } from 'react';
import Conversation from './conversation';
import { Box, Divider, styled, CircularProgress } from '@mui/material';
import { userContext } from '../../../App';
import { useAuthContext } from '../../../AccountContext/accountContext';
import axios from 'axios';
import useConversation from '../../../api/zustand';
import { useGetConversation } from '../../../api/api';
import ConfirmationModal from './confirmationModel';

const Component = styled(Box)`
  height: 81vh;
  overflow: overlay;
`;

const StyledDivider = styled(Divider)`
  margin: 0 0 0 70px;
  background-color: #e9edef;
  opacity: 0.6;
`;


const Conversations = () => {
  const { search } = useContext(userContext);
  const { conversations, loading } = useGetConversation();
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const searchUser = conversations.filter((val) => {
    if (search === '') {
      return val;
    } else if (val.name.toLowerCase().includes(search.toLowerCase())) {
      return val;
    } else {
      return '';
    }
  });

  const handleDeleteContact = async () => {
    try {
      if (selectedConversation && selectedConversation._id) {
        await axios.delete(`http://localhost:4000/users/${selectedConversation._id}`, {
          headers: {
            Authorization: `Bearer  ${localStorage.getItem('userToken')}` // Include the authorization token in the headers
          }
        });
        setSelectedContacts(selectedContacts.filter((id) => id !== selectedConversation._id));
        setConfirmationOpen(false);
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };


  const handleConfirmationOpen = () => {
    setConfirmationOpen(true);
  };

  const handleConfirmationClose = () => {
    setConfirmationOpen(false);
  };

  return (
    <Component>
      {searchUser.length === 0 && !loading ? (
        <div style={{ fontFamily: 'inherit', textAlign: 'center', color: '#4A4A4A' }}>No conversations found.</div>
      ) : (
        searchUser.map((conversation) => (
          authUser.name !== conversation.name && (
            <div key={conversation._id} onDoubleClick={handleConfirmationOpen}>
              <Conversation conversation={conversation} />
              <StyledDivider />
            </div>
          )
        ))
      )}
      {loading && <CircularProgress />}
      <ConfirmationModal open={confirmationOpen} handleClose={handleConfirmationClose} handleConfirm={handleDeleteContact} />
    </Component>
  );
};

export default Conversations;
