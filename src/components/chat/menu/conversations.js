import React, { useContext} from 'react';
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
  const { authUser } = useAuthContext()


  const searchUser = conversations.filter((val) => {
    if (search === '') {
      return val;
    } else if (val.name.toLowerCase().includes(search.toLowerCase())) {
      return val;
    } else {
      return '';
    }
  })
console.log(searchUser);

  return (
    <Component>
      {searchUser.length === 0 && !loading ? (
        <div style={{ fontFamily: 'inherit', textAlign: 'center', color: '#4A4A4A' }}>No conversations found.</div>
      ) : (
        searchUser.map((conversation) => (
          authUser.name !== conversation.name && (
            <div key={conversation._id}>
              <Conversation conversation={conversation} />
              <StyledDivider />
            </div>
          )
        ))
      )}
      {loading && <span className='loading loading-spinner mx-auto'></span>}
    </Component>
  );
};

export default Conversations;
