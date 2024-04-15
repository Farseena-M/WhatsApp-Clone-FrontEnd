import { Box, styled } from '@mui/material'
import React, { useContext } from 'react'
import ChatFooter from './chatFooter'
import { Axios, userContext } from '../../../App'

const Wrapper = styled(Box)`
background-image:url(${'https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png'})
`
const Component = styled(Box)`
height:82vh;
overflow-y:scroll;
`


const Messages = ({ person, conversation }) => {

  const userId = localStorage.getItem('userId')
  const { value, setValue } = useContext(userContext)
  // console.log(conversation);

  const newMessage = async (data) => {
    try {
      await Axios.post('http://localhost:4000/users/message/add', data)
    } catch (err) {
      console.log(`Error while calling newMessage api`, err.message);
    }
  }


  const sendText = async (e) => {
    // console.log(e);
    const code = e.keyCode || e.which
    if (code === 13) {
      let message = {
        senderId: userId,
        recieverId: person._id,
        conversationId: conversation._id,
        type: 'text',
        text: value
      }
      await newMessage(message)
      setValue('')
    }
  }

  return (
    <Wrapper style={{ backgroundSize: '50%' }}>
      <Component>

      </Component>
      <ChatFooter sendText={sendText} setValue={setValue} value={value} />
    </Wrapper>
  )
}

export default Messages