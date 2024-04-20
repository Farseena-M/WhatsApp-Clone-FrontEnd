import { Drawer, Typography, Box ,styled} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React, { useState } from 'react'
import ProfileEdit from './profile';

const Header = styled(Box)`
background:#008069;
height:107px;
color:#FFFFFF;
display:flex;
& > svg, & > p {
    margin-top:auto;
    font-weight:600;
}
`;
const Text = styled(Typography)`
font-size:18px;
`;
const Component = styled(Box)`
background:#ededed;
height:85%;
`;
const drawerStyle = {
    left:20,
    top:20,
    height:'95%',
    width:'30%',
    boxShadow:'none',
}


const InfoDrawer = ({open,setOpen}) => {
const handleClose = () =>{
    setOpen(false)
}

  return (
    <Drawer
    open={open}
    onClose={handleClose}
    PaperProps={{sx:drawerStyle}}
    style={{zIndex:1500}}
    >
    <Header>
    <ArrowBackIcon style={{cursor:'pointer',position:'relative',bottom:'14px',left:'12px'}} onClick={()=>setOpen(false)}/>
    <Text style={{padding:'15px',position:'relative',left:'20px'}}>Profile</Text>
    </Header>
    <Component>
     <ProfileEdit />
    </Component>
    </Drawer>
  )
}

export default InfoDrawer