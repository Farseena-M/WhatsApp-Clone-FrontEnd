import React from 'react'
import {Box,Typography,Styled} from '@mui/material'
import {Search,MoreVert} from '@mui/icons-material'
import VideocamIcon from '@mui/icons-material/Videocam';


const Header = Styled(Box)`
height:44px;

`


const ChatHeader = () => {
  return (
    <Header>
        <img src='' alt='dp' />
        <Box>
            <Typography>Name</Typography>
            <Typography>Online status</Typography>
        </Box>
        <Box>
            <VideocamIcon />
            <Search />
            <MoreVert />
        </Box>
    </Header>
  )
}

export default ChatHeader