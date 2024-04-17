import React, { useRef, useState } from 'react'
import { Dialog, Box, styled, AppBar, Toolbar, Button, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom';

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
const Image = styled('img')({
    width: 200,
    height: 200,
    borderRadius: '50%',
    padding: '25px 0',
    cursor: 'pointer'
})


const ProfileEdit = () => {
    const Nvgt = useNavigate()
    const inputRef = useRef(null)
    const [image, setImage] = useState('')
    const profile = localStorage.getItem('Profile')
    const userName = localStorage.getItem('UserName')

    const handleImageClick = () => {
        inputRef.current.click()
    }
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImage(file)
    }

    return (
        <>
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
                    <div onClick={handleImageClick} className="container-fluid" style={{ position: 'absolute', top: '20%', left: '35%' }}>
                        {image ? <Image src={URL.createObjectURL(image)} alt='' /> : <Image src={profile} alt='' />}
                        <input type='file' ref={inputRef} onChange={handleImageChange} style={{ display: 'none' }} />
                    </div>
                    <div className="container-fluid" style={{ position: 'absolute', top: '30%', left: '35%' }}>
                        <TextField id="standard-basic" value={userName} label="Enter Your Name...." variant="standard" style={{ position: 'absolute', top: '100px' }} />
                        <TextField id="standard-basic"  label="about...." variant="standard" style={{ position: 'absolute', top: '150px' }} />
                        <Button style={{ position: 'absolute', left: '70px', top: '230px' }} className="bg-success" variant='contained' onClick={() => Nvgt('/chat')}>Save</Button>
                    </div>
                </Dialog>
            </Component>
        </>
    )
}

export default ProfileEdit 