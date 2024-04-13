import React, { useContext, useEffect } from 'react';
import Conversation from './conversation';
import { Box, Divider, styled } from '@mui/material';
import { Axios, userContext } from '../../../App';
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
  const { user, setUser, search } = useContext(userContext);
  const mainUser = localStorage.getItem('Name')


  const searchUser = user.filter((val) => {
    if (search === '') {
      return val;
    } else if (val.name.toLowerCase().includes(search.toLowerCase())) {
      return val;
    } else {
      return '';
    }
  })


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await Axios.get('http://localhost:4000/users/all');
        console.log(response.data.data);
        setUser(response.data.data);
      } catch (err) {
        toast.error('Error fetching users:', err);
      }
    };
    fetchUsers();

  }, [setUser]);

  return (
    <Component>
      {searchUser.map((usr) => (
        mainUser !== usr.name &&
        <div key={usr._id}>
          <Conversation usr={usr} />
          <StyledDivider />
        </div>
      ))}
    </Component>
  );
};

export default Conversations;
