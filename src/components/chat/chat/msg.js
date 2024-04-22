import { Box, Typography, styled } from '@mui/material';
import React from 'react';
import { formatDate } from '../../../api/messageTime';
import { useAuthContext } from '../../../AccountContext/accountContext';

const MessageContainer = styled(Box)`
  max-width: 60%;
  padding: 5px;
  width: fit-content;
  display: flex;
  border-radius: 10px;
  word-break: break-word;
  margin-top: 3px;
  background: ${({ own }) => (own ? '#dcf8c6' : '#FFFFFF')};
  margin-left: ${({ own }) => (own ? 'auto' : 'initial')};
`;

const Text = styled(Typography)`
  font-size: 14px;
  padding: 0 25px 0 5px;
`;

const Time = styled(Typography)`
  font-size: 10px;
  color: #919191;
  margin-top: 6px;
  word-break: keep-all;
  margin-top: auto;
`;

const Msg = ({ message }) => {
  const {authUser} =useAuthContext()
  const fromMe = message.sender === authUser._id;
  return (
    <MessageContainer own={fromMe}>
      <Text>{message.message}</Text>
      <Time>{formatDate(message.createdAt)}</Time>
    </MessageContainer>
  );
};

export default Msg;
