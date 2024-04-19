import React, { useState } from 'react'
import { Box, styled } from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat';
import HeaderMenu from './headerMenu';
import InfoDrawer from '../drawer/drawer';
import { useAuthContext} from '../../../AccountContext/accountContext';

const Component = styled(Box)`
height:55px;
background:#ededed;
padding:8px 16px;
display:flex;
`
const Wrapper = styled(Box)`
margin-left:auto;
& > *:first-of-type {
  font-size:22px;
  margin-right:8px;
  margin-top:3px
}
`
const Image = styled('img')({
  height: 40,
  width: 40,
  borderRadius: '50%'
})

const Header = () => {
  const [openDrawer, setOpenDrawer] = useState(false)
  const {authUser} = useAuthContext()

  const toggleDrawer = () => {
    setOpenDrawer(true)
  }


  return (
    <>
      <Component>
        <Image src={authUser.image} alt='dp' onClick={() => toggleDrawer()} style={{ cursor: 'pointer' }} />
        <Wrapper>
          <ChatIcon />
          <HeaderMenu open={openDrawer} setOpenDrawer={setOpenDrawer} />
        </Wrapper>
      </Component>
      <InfoDrawer open={openDrawer} setOpen={setOpenDrawer} />
    </>
  )
}

export default Header