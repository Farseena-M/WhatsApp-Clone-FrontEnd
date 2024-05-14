import React, { useState } from 'react';
import { Box, styled, AppBar, Toolbar, Dialog, CircularProgress } from '@mui/material';
import Menu from './chat/menu/menu';
import BlankChat from './chat/chat/chat';
import ChatBox from './chat/chat/chatBox';
import useConversation from '../api/zustand';
import AudioChat from './chat/chat/audioChat/AudioChat';
import { useSelector } from 'react-redux';

const Components = styled(Box)`
  display: flex;
`;
const LeftComponent = styled(Box)`
  min-width: 450px;
`;
const RightComponent = styled(Box)`
  width: 73%;
  min-width: 300px;
  height: 100%;
  border-left: 1px solid rgba(0, 0, 0, 0.14);
`;
const Component = styled(Box)`
  height: 100vh;
  background-color: #DCDCDC;
`;
const Header = styled(AppBar)`
  height: 125px;
  background-color: #00A884;
  box-shadow: none;
`;
const dialogStyle = {
  height: '95%',
  width: '100%',
  margin: '20px',
  maxWidth: '100%',
  maxHeight: '100%',
  borderRadius: '0',
  boxShadow: 'none',
  overflow: 'hidden'
};

const ChatDialog = () => {
  const {call} = useSelector(state => state)
  const { selectedConversation } = useConversation();
  const [loading, setLoading] = useState(true); // Step 1: Introduce Loading State

  // Simulating loading effect
  setTimeout(() => {
    setLoading(false); // Step 2: Set Loading State to false when rendering is complete
  }, 1000);

  return (
    <Component>
       {call ? <AudioChat />:""}
      <Header>
        <Toolbar />
      </Header>
      <Dialog
        open={true}
        PaperProps={{ sx: dialogStyle }}
        hideBackdrop={true}
        maxWidth={'md'}
      >
        {/* Step 3: Conditional Rendering based on Loading State */}
        {loading ? (
          <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CircularProgress />
          </Box>
        ) : (
          <Components>
            <LeftComponent>
              <Menu />
            </LeftComponent>
            <RightComponent>
              {!selectedConversation ? <BlankChat /> : <ChatBox />}
            </RightComponent>
          </Components>
        )}
      </Dialog>
    </Component>
  );
};

export default ChatDialog;
