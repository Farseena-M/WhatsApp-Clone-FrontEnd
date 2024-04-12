import React, { useContext, useEffect } from 'react';
import Conversation from './conversation';
import { Box, Divider, styled } from '@mui/material';
import { userContext } from '../../../App';
import { Axios } from 'axios';
import { toast } from 'react-toastify';

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
  const { user, setUser } = useContext(userContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await Axios.get('http://localhost:4000/users/all');
        const userData = response.data.data.findUser;
        setUser(userData);
      } catch (err) {
        toast.error(err);
      }
    };
    fetchUsers();
  }, [setUser]);

  return (
    <Component>
      {user.map((usr) => (
        <div key={usr._id}>
          <Conversation usr={usr} />
          <StyledDivider />
        </div>
      ))}
    </Component>
  );
};

export default Conversations;
