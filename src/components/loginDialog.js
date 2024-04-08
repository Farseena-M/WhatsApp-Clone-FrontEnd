import { Dialog, Box, Typography, List, ListItem, styled, AppBar, Toolbar } from '@mui/material'
import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

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
  height: '96%',
  marginTop: '12%',
  width: '60%',
  maxWidth: '100%',
  maxHeight: '100%',
  boxShadow: 'none',
  overflow: 'hidden'
}
const Compnent = styled(Box)`
display:flex;
`
const Container = styled(Box)`
padding:56px 0 56px 56px;
`
const QrCode = styled('img')({
  height: 264,
  width: 264,
  margin: '50px 0 0 170px'
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
  const Nvgt = useNavigate()
  return (
    <div>
      <Component>
        <Header>
          <Toolbar>

          </Toolbar>
        </Header>
        <Dialog
          open={true}
          PaperProps={{ sx: dialogStyle }}
          hideBackdrop={true}
        >
          <Compnent>
            <Container>
              <Title>To use WhatsApp on your computer:</Title>
              <StyledList>
                <ListItem>1. Open WhatsApp on your Phone</ListItem>
                <ListItem>2. Tap Menu Settings and select whatsApp Web</ListItem>
                <ListItem>3. Point your phone to this screen to capture the code</ListItem>
              </StyledList>
            </Container>
            <Box>
              <QrCode src='https://www.ginifab.com/feeds/qr_code/img/qrcode.jpg' alt='qr code' />
            </Box>
          </Compnent>
          <Button style={{ height: '30px', width: '250px', position: 'relative', left: '660px', bottom: '160px', border: 'none', cursor: 'pointer', color: 'white', backgroundColor: 'white', padding: '3px' }} onClick={() => Nvgt('/signin')}>Login</Button>
        </Dialog>
      </Component>
    </div>
  )
}

export default LoginDialog 