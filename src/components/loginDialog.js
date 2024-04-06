import { Dialog, Box, Typography, List, ListItem , styled , AppBar,Toolbar} from '@mui/material'
import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'; 
import { AccoundContext } from '../context/accoundProvider';
import ChatDialog from './chatDialog';
import { addUser } from '../service/api';


const Component = styled(Box)`
height:100vh;
background-color:#DCDCDC;

`
const Header = styled(AppBar)`
height:220px;
background-color:#00bfa5;
box-shadow:none;
`
const dialogStyle = {
    height:'96%',
    marginTop:'12%',
    width:'60%',
    maxWidth:'100%',
    maxHeight:'100%',
    boxShadow:'none',
    overflow:'hidden'
}
const Compnent = styled(Box)`
display:flex;
`
const Container = styled(Box)`
padding:56px 0 56px 56px;
`
const QrCode = styled('img')({
    height:264,
    width:264,
    margin:'50px 0 0 170px'
})
 const Title = styled(Typography)`
 font-size:26px;
 color:#525252;
 font-weight:300;
 font-family:inherit;
 margin-bottom:25px;
 `
const StyledList = styled(List)`
& > li {
    padding:0;
    margin-top:15px;
    font-size:18px;
    line-height:28px;
    color:#4a4a4a;
}
`
const LoginDialog = () => {

  const {account,setAccount} = useContext(AccoundContext)

  const onLoginSuccess = async ({onGoogleLogin}) => {
    
    onGoogleLogin()
  };
  
  const onLoginError = (res) => {
    console.log('Login failed', res);
  }; 
  

  return (
    <div>
      <Component>
        {account ? <ChatDialog />:
        <>
        <Header>
            <Toolbar>

            </Toolbar>
        </Header>
        <Dialog
         open={true}
         PaperProps={{sx:dialogStyle}}
         hideBackdrop={true}
        >
       <Compnent>
        <Container>
         <Title>To use WhatsApp on your computer:</Title>
         <StyledList>
            <ListItem>1. open WhatsApp on your Phone</ListItem>
            <ListItem>2. Tap Menu Settings and select whatsApp Web</ListItem>
            <ListItem>3. Point your phone to this screen to capture the code</ListItem>
         </StyledList>
        </Container>
        <Box style={{position:'relative'}}>
         <QrCode src='https://www.ginifab.com/feeds/qr_code/img/qrcode.jpg' alt='qr code' />
        <Box style={{position:'absolute',top:'50%',right:'80px',transform:'translateX(25%)'}}>
        <GoogleLogin 
        onSuccess={onLoginSuccess}
        onError={onLoginError}
        />
       </Box> 
        </Box>
       </Compnent>
        {/* <Button style={{height:'30px',width:'300px',position:'relative',left:'635px',bottom:'160px',border:'none',cursor:'pointer',color:'darkgreen',backgroundColor:'white',padding:'5px'}} onClick={()=>Nvgt('/loginphone')}>Otp Login</Button>  */}
        </Dialog>
        </>
}
        </Component>
    </div>
  )
}

export default LoginDialog