import { Box, styled } from '@mui/material'
import React, { useContext} from 'react'
import ChatFooter from './chatFooter'
import {userContext } from '../../../App'
import Msg from './msg'

const Wrapper = styled(Box)`
background-image:url(${'https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png'})
`
const Component = styled(Box)`
height:82vh;
overflow-y:scroll;
`
const Container =styled(Box)`
padding:1px 8px;
`


const Messages = () => {

  const { value, setValue} = useContext(userContext)

  return (
    <Wrapper style={{ backgroundSize: '50%' }}>
      <Component>
      
          <Container>
          <Msg />
          </Container>
      </Component>
      <ChatFooter setValue={setValue} value={value} />
    </Wrapper>
  )
}

export default Messages