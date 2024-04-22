import React from 'react';
import { Box, styled, AppBar, Toolbar, Dialog } from '@mui/material';
import Menu from './chat/menu/menu';
import BlankChat from './chat/chat/chat';
import ChatBox from './chat/chat/chatBox';
import { useConversation } from '../api/zustand';

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
  const { selectedConversation } = useConversation();
  

  return (
    <Component>
      <Header>
        <Toolbar />
      </Header>
      <Dialog
        open={true}
        PaperProps={{ sx: dialogStyle }}
        hideBackdrop={true}
        maxWidth={'md'}
      >
        <Components>
          <LeftComponent>
            <Menu />
          </LeftComponent>
          <RightComponent>
            {!selectedConversation ? <BlankChat /> : <ChatBox />}
          </RightComponent>
        </Components>
      </Dialog>
    </Component>
  );
};

export default ChatDialog;
