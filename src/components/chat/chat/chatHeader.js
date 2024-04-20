import React, { useEffect } from 'react'
import { Box, Typography, styled } from '@mui/material'
import VideocamIcon from '@mui/icons-material/Videocam';
import { useConversation } from '../../../api/zustand';

const Header = styled(Box)`
height:55px;
background:#ededed;
padding:8px 16px;
display:flex;
alighn-items:center;
`;
const Image = styled('img')({
  height: '40px',
  width: '40px',
  objectFit: 'cover',
  borderRadius: '50%'
})
const Name = styled(Typography)`
margin-left:12px !important;
`;
const Status = styled(Typography)`
margin-left:12px !important;
font-size:12px;
color:rgb(0,0,0,0.6);
`;
const RightContainer = styled(Box)`
margin-left:auto;
& : first-child{
    padding: 2px 2px;
    font-size:30px;
    margin-right:20px;
    margin-top:3px;
  }
`;


const ChatHeader = () => {
  const { selectedConversation, setSelectedConversation } = useConversation()

  useEffect(() => {
    //cleanup function (unmounts)
    return () => setSelectedConversation(null)
  }, [setSelectedConversation])

  return (
    <Header>
      <Image src={selectedConversation.image} alt='dp' />
      <Box>
        <Name>{selectedConversation.name}</Name>
        <Status>Offline</Status>
      </Box>
      <RightContainer>
        <VideocamIcon />
      </RightContainer>
    </Header>
  )
}

export default ChatHeader