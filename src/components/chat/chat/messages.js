import { Box, styled } from '@mui/material';
import React, { useEffect } from 'react';
import ChatFooter from './chatFooter';
import Msg from './msg';
import { useGetMessages } from '../../../api/api';
import MessageSkeleton from '../../../api/messageSkeleton'

const Wrapper = styled(Box)`
  background-image: url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png');
  background-size: 50%;
`;

const Component = styled(Box)`
  height: 82vh;
  overflow-y: scroll;
`;

const Container = styled(Box)`
  padding: 1px 8px;
`;

const Messages = () => {
  const { messages, loading } = useGetMessages();
  console.log('messages:', messages);

  return (
    <Wrapper>
      <Component>
        <Container>
          {!loading && messages.length > 0 && messages.map((message) => (
            <Msg key={message._id} message={message}/>
          ))}
          {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
          {!loading && messages.length === 0 && (
            <p className='text-center' style={{ color: '#4A4A4A', fontSize: '16px' }}>Send a message to start conversation</p>
          )}
        </Container>
      </Component>
      <ChatFooter />
    </Wrapper>
  );
};

export default Messages;
