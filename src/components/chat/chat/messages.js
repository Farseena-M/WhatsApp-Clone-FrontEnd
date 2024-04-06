import { Box,styled } from '@mui/material'
import React from 'react'
import ChatFooter from './chatFooter'

const Wrapper = styled(Box)`
background-image:url(${'https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png'})
`
const Component = styled(Box)`
height:82vh;
overflow-y:scroll;
`


const Messages = () => {
  return (
    <Wrapper style={{backgroundSize:'50%'}}>
    <Component>

    </Component>
    <ChatFooter />
    </Wrapper>
  )
}

export default Messages