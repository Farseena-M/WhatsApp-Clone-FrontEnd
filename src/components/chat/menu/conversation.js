import { Box, Typography, styled } from '@mui/material';
import React from 'react';
import useConversation from '../../../api/zustand';

const Component = styled(Box)(({ selected }) => ({
    display: 'flex',
    height: '70px',
    padding: '13px 0',
    cursor: 'pointer',
    backgroundColor: selected ? '#ededed' : '', // Conditionally set background color
}));

const Image = styled('img')({
    height: '45px',
    width: '75px',
    borderRadius: '50%',
    padding: '0 14px',
    objectFit: 'cover',
});

const Conversation = ({ conversation }) => {
    const { selectedConversation, setSelectedConversation } = useConversation();
    const selected = selectedConversation?._id === conversation._id;


    return (
        <Component selected={selected} onClick={() => setSelectedConversation(conversation)}>
            <Box>
                {conversation.image && <Image src={conversation.image} alt={conversation.name} />}
            </Box>
            <Box>
                <Box>
                    <Typography style={{ fontFamily: 'inherit', padding: '10px 10px' }}>
                        {conversation.name}
                    </Typography>
                </Box>
            </Box>
        </Component>
    );
};

export default Conversation;
