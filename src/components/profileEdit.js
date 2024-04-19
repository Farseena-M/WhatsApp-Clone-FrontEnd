import React, {useState } from 'react'
import { Dialog, Box, styled, AppBar, Toolbar, Button, TextField } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../AccountContext/accountContext';
import { Axios } from '../App';

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
    const {id} =useParams()
    const [newUsername, setNewUsername] = useState('');
    const [newImage, setNewImage] = useState(null);
    const {authUser,setAuthUser} = useAuthContext()

    const handleImageChange = (e) => {
        setNewImage(e.target.files[0]);
    };
    const handleUsernameChange = (e) => {
        setNewUsername(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
    
        try {
            // Check if newImage and newUsername are not empty
            if (!newImage || !newUsername) {
                console.error('Please select an image and enter a username');
                return;
            }
    
            const formData = new FormData();
            formData.append('username', newUsername);
            formData.append('image', newImage);
    
            const response = await Axios.put(`http://localhost:4000/users/${id}`, formData);
            setAuthUser(response.data.data);
            Nvgt('/chat');
            console.log(response.data.message);
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };


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
                    <div className="container-fluid" style={{ position: 'absolute', top: '20%', left: '35%' }}>
                     <Image src={authUser.image} alt='' onClick={() => document.getElementById('imageInput').click()}/>
                        <input id='imageInput' type='file'  onChange={handleImageChange} style={{ display: 'none' }} />
                    </div>
                    <div className="container-fluid" style={{ position: 'absolute', top: '30%', left: '35%' }}>
                        <TextField type="text" id="standard-basic" value={newUsername || authUser.username}   label="Enter Your Name...." variant="standard" style={{ position: 'absolute', top: '100px' }} onChange={handleUsernameChange}/>
                        <TextField id="standard-basic" label="about...." variant="standard" style={{ position: 'absolute', top: '150px' }} />
                        <Button style={{ position: 'absolute', left: '70px', top: '230px' }} className="bg-success" variant='contained' onClick={handleSubmit}>Save</Button>
                    </div>
                </Dialog>
            </Component>
        </>
    )
}

export default ProfileEdit 

