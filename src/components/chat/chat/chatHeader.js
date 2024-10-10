import React, { useEffect, useState } from 'react';
import { Box, Typography, styled, Modal } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import useConversation from '../../../api/zustand';
import { useSocketContext } from '../../../AccountContext/socketContext';
import CallIcon from '@mui/icons-material/Call';
import VideoCallComponent from './VideoCall';

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
  cursor: 'pointer',
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
const Call = styled(VideocamIcon)`
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
  const { selectedConversation } = useConversation();
  const { onlineUsers, socket } = useSocketContext();
  const isOnline = onlineUsers.includes(selectedConversation._id);
  const [modalOpen, setModalOpen] = useState(false);
  const { setLocalStream } = useSocketContext();
  const [isInCall, setIsInCall] = useState(false);



  const handleImageClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };


  const handleCallClick = () => {
    if (socket) {
      const callData = {
        receiverId: selectedConversation._id,
      };
      socket.emit('sendOffer', callData);
      console.log(`Calling ${selectedConversation.name}...`);
      setIsInCall(true);
    }
  };

  useEffect(() => {
    const getUserMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setLocalStream(stream);
      } catch (error) {
        console.error("Error accessing media devices.", error);
      }
    };

    getUserMedia();
  }, []);


  const handleAcceptCall = () => {
    console.log('Call accepted');
    setIsInCall(true);
  };

  const handleDeclineCall = () => {
    console.log('Call declined');
    setIsInCall(false);
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
          {/* <CallIcon /> */}
          <Call onClick={handleCallClick} />
        </RightContainer>
      </Header>
      {isInCall && <VideoCallComponent
        onDecline={handleDeclineCall}
      />}
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <ModalComponent>
          <Typography variant='h6' style={{ textAlign: 'center', color: '#00bfa5', fontSize: '30px', fontFamily: 'serif' }}>
            {selectedConversation.name}
          </Typography>
          <CenteredBox>
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
