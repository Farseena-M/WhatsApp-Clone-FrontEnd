import React, { useContext } from 'react';
import Conversation from './conversation';
import { Box, Divider, styled } from '@mui/material';
import { userContext } from '../../../App';
import { useGetConversations } from '../../../api/api';
import { useAuthContext } from '../../../AccountContext/accountContext';

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
  const { conversations, loading } = useGetConversations()
  const {authUser} = useAuthContext()

  const searchUser = conversations.filter((val) => {
    if (search === '') {
      return val;
    } else if (val.name.toLowerCase().includes(search.toLowerCase())) {
      return val;
    } else {
      return '';
    }
  })


  return (
    <Component>

      <div>
        {searchUser.map((conversation) => (
          authUser.name !== conversation.name &&
          <div key={conversation._id} >
            <Conversation conversation={conversation} />
            <StyledDivider />
          </div>
        ))}

        {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
      </div>

    </Component>
  );
};

export default Conversations;
