import React, { useContext} from 'react'
import { Box } from '@mui/material'
import ChatHeader from './chatHeader'
import Messages from './messages'
import {userContext } from '../../../App'



const ChatBox = () => {

  const { person} = useContext(userContext)
  
  return (
    <Box style={{ height: '75%' }}>
      <ChatHeader person={person} />
      <Messages />
    </Box>
  )
}

export default ChatBox