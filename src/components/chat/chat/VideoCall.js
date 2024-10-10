import React, { useState } from 'react';
import { Box, Button, Typography, styled } from '@mui/material';
import { useSocketContext } from "../../../AccountContext/socketContext";
import useConversation from '../../../api/zustand';

const VideoContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0px 20px 10px;
  height: 100vh; /* Full height */
  background: rgba(220, 220, 220, 0.7); /* Semi-transparent #DCDCDC */
  border-radius: 12px; /* Rounded corners */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2); /* Soft shadow */
  padding: 20px; /* Padding for better spacing */
`;

const VideoWrapper = styled(Box)`
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: 800px;
  margin-bottom: 20px;
`;

const Video = styled('video')`
  width: 300px;
  height: 200px;
  border: 2px solid #00bfa5;
  border-radius: 8px;
  background: #000; /* Fallback for video */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3); /* Box shadow for video */
`;

const ButtonContainer = styled(Box)`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px; /* Space between buttons and video */
`;

const StyledButton = styled(Button)`
  background-color: #ff0000; /* Red button */
  color: white; /* White text */
  border-radius: 20px; /* Rounded button corners */
  &:hover {
    background-color: #cc0000; /* Darker red on hover */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2); /* Shadow effect on hover */
  }
`;

const VideoCallComponent = ({ onDecline, onAccept }) => {
    const { localStream, remoteStream, onlineUsers } = useSocketContext();
    const { selectedConversation } = useConversation();

    const isReceiverOnline = onlineUsers.includes(selectedConversation._id);
    const [callAccepted, setCallAccepted] = useState(false);

    const handleAccept = () => {
        setCallAccepted(true);
        onAccept(); 
    };

    return (
        <VideoContainer>
            <Typography 
                variant="h5" 
                gutterBottom 
                color="#333333" 
                fontWeight="bold"
                align="center"
                style={{ textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)' }} 
            >
                {isReceiverOnline ? `Ringing ${selectedConversation.name}....` : `Calling ${selectedConversation.name}....`}
            </Typography>
            <VideoWrapper>
                <Video
                    autoPlay
                    playsInline
                    muted
                    ref={(video) => {
                        if (video) {
                            video.srcObject = localStream;
                        }
                    }}
                />
                <Video
                    autoPlay
                    playsInline
                    ref={(video) => {
                        if (video) {
                            video.srcObject = remoteStream;
                        }
                    }}
                />
            </VideoWrapper>
            <ButtonContainer>
                <StyledButton variant="contained" onClick={onDecline}>
                    Decline
                </StyledButton>
            </ButtonContainer>
        </VideoContainer>
    );
};

export default VideoCallComponent;
