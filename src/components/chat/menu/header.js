import React, { useContext, useState } from 'react'
import { Box ,styled} from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat';
import HeaderMenu from './headerMenu';
import InfoDrawer from '../drawer/drawer';
import { AccoundContext } from '../../../context/accoundProvider';

const Component = styled(Box)`
height:55px;
background:#ededed;
padding:8px 16px;
display:flex;
`
const Wrapper = styled(Box)`
margin-left:auto;
& : first-child{
  font-size:22px;
  margin-right:8px;
  margin-top:3px
}
`
const Image = styled('img')({
  height:40,
  width:40,
  borderRadius:'50%'
})

const Header = () => {
  const {account} = useContext(AccoundContext)
  const [openDrawer,setOpenDrawer] = useState(false)
const toggleDrawer = () =>{
  setOpenDrawer(true)
}

  return (
    <>
    <Component>
    <Image src={account.picture} alt='dp' onClick={()=>toggleDrawer()} style={{cursor:'pointer'}}/>
    <Wrapper>
     <ChatIcon />
     <HeaderMenu  setOpenDrawer={setOpenDrawer}/>
    </Wrapper>
  </Component>
  <InfoDrawer open={openDrawer} setOpen={setOpenDrawer}/>
  </>
  )
}

export default Header