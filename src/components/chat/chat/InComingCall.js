import React from 'react';
import { Box, Button, Typography, styled } from '@mui/material';

const IncomingCallContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: rgba(220, 220, 220, 0.7);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  padding: 20px;
`;

const StyledButton = styled(Button)`
  background-color: #00bfa5; /* Accept button color */
  color: white;
  margin-top: 20px;
  &:hover {
    background-color: #009688; /* Darker shade on hover */
  }
`;

const IncomingCallComponent = ({ callerName, onAccept, onDecline }) => {
  return (
    <IncomingCallContainer>
      <Typography variant="h4" gutterBottom>
        Incoming call from {callerName}
      </Typography>
      <StyledButton onClick={onAccept}>Accept</StyledButton>
      <Button onClick={onDecline} style={{ marginTop: 10 }}>
        Decline
      </Button>
    </IncomingCallContainer>
  );
};

export default IncomingCallComponent;
