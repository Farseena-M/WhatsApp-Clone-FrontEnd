import React, { useState } from 'react';
import { Dialog, Box, styled, AppBar, Toolbar, Button, TextField } from '@mui/material';
import { Axios } from '../App';
import { useAuthContext } from '../AccountContext/accountContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Component = styled(Box)`
  height: 100vh;
  background-color: #DCDCDC;
`;

const Header = styled(AppBar)`
  height: 220px;
  background-color: #00bfa5;
  box-shadow: none;
`;

const dialogStyle = {
    height: '96%',
    marginTop: '12%',
    width: '60%',
    maxWidth: '100%',
    maxHeight: '100%',
    boxShadow: 'none',
    overflow: 'hidden',
};

const ProfileEdit = () => {
    const Nvgt = useNavigate()
    const { authUser } = useAuthContext()
    const [newUsername, setNewUsername] = useState('');
    const [newImage, setNewImage] = useState('');
    const [about, setAbout] = useState('');

    const handleImageChange = (e) => {
        setNewImage(e.target.files[0]);
    };

    const handleUsernameChange = (e) => {
        setNewUsername(e.target.value);
    };


    const handleAboutChange = (e) => {
        setAbout(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('username', newUsername);
            formData.append('image', newImage);
            formData.append('about', about);

            // Make API call to update user profile
            const response = await Axios.patch(`http://localhost:4000/users/updateProfile/${authUser._id}`, formData);

            // Update local storage with the updated user data
            const updatedUser = { ...authUser, ...response.data.user };
            localStorage.setItem('user', JSON.stringify(updatedUser));

            console.log(response.data);
            toast.success('User Updated Successfully')
            Nvgt('/chat')
        } catch (error) {
            console.error('Error updating profile:', error.response.data);
        }
    };


    return (
        <>
            <Component>
                <Header>
                    <Toolbar></Toolbar>
                </Header>
                <Dialog open={true} PaperProps={{ sx: dialogStyle }} hideBackdrop={true}>
                    <div className="container-fluid" style={{ position: 'absolute', top: '13%', left: '30%' }}>
                        <div><h3 style={{ padding: '10px', color: 'darkgreen', fontFamily: 'serif' ,fontSize:'35px'}}>Update Your Profile</h3></div>
                        <div style={{ textAlign: 'center', padding: '15px' }}>
                        </div></div>
                    <div className="container-fluid" style={{ position: 'absolute', top: '20%', left: '35%' }}>
                        <input id="imageInput" type="file" onChange={handleImageChange} style={{ display: 'none' }} />
                        {/* Display user image */}
                        <img src={newImage ? URL.createObjectURL(newImage) : authUser.image} alt="" style={{ width: 200, height: 200, borderRadius: '50%', padding: '25px 0', cursor: 'pointer' }} onClick={() => document.getElementById('imageInput').click()} />
                    </div>
                    <div className="container-fluid" style={{ position: 'absolute', top: '30%', left: '35%' }}>
                        {/* Username input */}
                        <TextField type="text" value={newUsername} onChange={handleUsernameChange} label="Enter Your Name...." variant="standard" style={{ position: 'absolute', top: '100px' }} />
                        {/* About input */}
                        <TextField type="text" value={about} onChange={handleAboutChange} label="About...." variant="standard" style={{ position: 'absolute', top: '150px' }} />
                        {/* Save button */}
                        <Button style={{ position: 'absolute', left: '70px', top: '230px' }} className="bg-success" variant="contained" onClick={handleSubmit}>Save</Button>
                    </div>
                </Dialog>
            </Component>
        </>
    );
};

export default ProfileEdit;
