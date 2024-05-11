import React, { useContext, useState } from 'react';
import { Box, Typography, styled, Modal } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import useConversation from '../../../api/zustand';
import { useSocketContext } from '../../../AccountContext/socketContext';
import { RoomContext } from '../../../AccountContext/roomContext';

const Header = styled(Box)`
  height: 55px;
  background: #ededed;
  padding: 8px 16px;
  display: flex;
  align-items: center;
`;
const Image = styled('img')({
  height: '40px',
  width: '40px',
  objectFit: 'cover',
  borderRadius: '50%',
  cursor: 'pointer', // Add cursor pointer to indicate clickable
});
const Name = styled(Typography)`
  margin-left: 12px !important;
`;
const Status = styled(Typography)`
  margin-left: 12px !important;
  font-size: 12px;
  color: rgb(0, 0, 0, 0.6);
`;
const RightContainer = styled(Box)`
  margin-left: auto;
  & :first-child {
    padding: 2px 2px;
    font-size: 30px;
    margin-right: 20px;
    margin-top: 3px;
  }
`;
const VideoCam = styled(VideocamIcon)`
  cursor: pointer;
`;

const ModalContent = styled(Box)`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  outline: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const ModalComponent = styled(ModalContent)`
height:350px;
width:400px;
`
const CenteredBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
const Type = styled(Typography)`
padding:10px;
color: rgb(0, 0, 0, 0.6);
`

const ChatHeader = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(selectedConversation._id);
  const { ws } = useContext(RoomContext);
  const [modalOpen, setModalOpen] = useState(false);

  const createRoom = () => {
    ws.emit('create-room');
  };

  const handleImageClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Header>
        <Image src={selectedConversation.image} alt='dp' onClick={handleImageClick} />
        <Box>
          <Name>{selectedConversation.name}</Name>
          <Status>{isOnline ? 'Online' : 'Offline'}</Status>
        </Box>
        <RightContainer>
          <VideoCam onClick={createRoom} />
        </RightContainer>
      </Header>
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <ModalComponent>
          <Typography variant='h6' style={{ textAlign: 'center', color: '#00bfa5', fontSize: '30px', fontFamily: 'serif' }}>{selectedConversation.name}</Typography>
          <CenteredBox >
            <Image src={selectedConversation.image} alt='dp' style={{ height: '150px', width: '150px' }} />
            <Type style={{ fontSize: '18px' }}>{selectedConversation.phone}</Type>
            <Type>{isOnline ? 'Online' : 'Offline'}</Type>
          </CenteredBox>
        </ModalComponent>
      </Modal>
    </>
  );
};

export default ChatHeader;
