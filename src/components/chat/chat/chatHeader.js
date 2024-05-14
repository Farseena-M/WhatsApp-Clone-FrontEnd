import React, { useContext, useState } from 'react';
import { Box, Typography, styled, Modal } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import useConversation from '../../../api/zustand';
import { useSocketContext } from '../../../AccountContext/socketContext';
import CallIcon from '@mui/icons-material/Call';
import { RoomContext } from '../../../AccountContext/roomContext';
import { useAuthContext } from '../../../AccountContext/accountContext';
import { useDispatch, useSelector } from 'react-redux';
import { GLOBALTYPES } from '../../../redux/action/globalType';

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
const Call = styled(CallIcon)`
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
  const { peer } = useSelector(state => state)
  const { socket } = useSocketContext()
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(selectedConversation._id);
  const [modalOpen, setModalOpen] = useState(false);
  const { authUser } = useAuthContext()
  const dispatch = useDispatch()


  const handleImageClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };


    // Call

  const caller = ({ video }) => {
    const { _id, name, image } = selectedConversation
    const msg = {   
      sender: authUser._id,
      recipient: _id, name, image, video


    }
    dispatch({ type: GLOBALTYPES.CALL, payload: msg })
  }

  const calleruser = ({ video }) => {
    
    const { _id, name, image } = authUser;
    console.log(authUser,"hh");
    const msg = {
      sender: selectedConversation._id,
      recipient: _id, name, image, video
    }
    if (peer?.open) msg.peerId = peer._id
    socket.emit('calleruser', msg)
  }


  // audio call

  const handleAudioCall = () => {
    caller({ video: false })
    calleruser({ video: false })
 }

  return (
    <>
      <Header>
        <Image src={selectedConversation.image} alt='dp' onClick={handleImageClick} />
        <Box>
          <Name>{selectedConversation.name}</Name>
          <Status>{isOnline ? 'Online' : 'Offline'}</Status>
        </Box>
        <RightContainer>
          <Call onClick={handleAudioCall} />
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
