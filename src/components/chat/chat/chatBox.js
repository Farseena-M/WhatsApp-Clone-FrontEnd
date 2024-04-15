import React, { useContext, useEffect } from 'react'
import { Box } from '@mui/material'
import ChatHeader from './chatHeader'
import Messages from './messages'
import { Axios, userContext } from '../../../App'



const ChatBox = () => {

  const { person, conversation, setConversation } = useContext(userContext)
  const userId = localStorage.getItem('userId')


  const getConversation = async (data) => {
    try {
      const res = await Axios.post('http://localhost:4000/users/conversation/get', data)
      return res.data
    } catch (err) {
      console.log(`Error while calling getConversation api`, err);
    }
  }


  useEffect(() => {
    const getConversationDetails = async () => {
      let data = await getConversation({ senderId: userId, recieverId: person._id })
      setConversation(data);
    }
    getConversationDetails()
  }, [])
  // console.log(conversation);
  return (
    <Box style={{ height: '75%' }}>
      <ChatHeader person={person} />
      <Messages person={person} conversation={conversation} />
    </Box>
  )
}

export default ChatBox