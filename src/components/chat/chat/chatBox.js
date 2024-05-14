import React from 'react'
import { Box } from '@mui/material'
import ChatHeader from './chatHeader'
import Messages from './messages'
import AudioChat from './audioChat/AudioChat'
import { useSelector } from 'react-redux'


const ChatBox = () => {
  const { call } = useSelector(state => state);

  return (
    <Box style={{ height: '75%' }}>
      <ChatHeader/>
      {call && <AudioChat/>}
      <Messages />
    </Box>
  )
}

export default ChatBox