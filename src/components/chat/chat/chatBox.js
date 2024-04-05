import React from 'react'
import {Box} from '@mui/material'
import ChatHeader from './chatHeader'
import Messages from './messages'



const ChatBox = () => {
  return (
    <Box>
      <ChatHeader />
      <Messages />
    </Box>
  )
}

export default ChatBox