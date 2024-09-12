import React, { useEffect, useRef, useState } from 'react';
import { Dialog, Box, styled, AppBar, Toolbar, Button, TextField, CircularProgress } from '@mui/material';
import { useAuthContext } from '../AccountContext/accountContext';
import { useNavigate } from 'react-router-dom';
import NoDp from '../components/assets/No Dp.png';
import axios from 'axios'
import { toast } from 'react-toastify';

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
    const Nvgt = useNavigate();
    const fileInputRef = useRef(null);
    const { authUser, setAuthUser } = useAuthContext();
    const [newImage, setNewImage] = useState(authUser?.image || '');
    const [newUserName, setNewUserName] = useState(authUser?.username || '');
    const [newAbout, setNewAbout] = useState(authUser?.about || '');
    const [previewImage, setPreviewImage] = useState(null);


    const handleImageClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewImage(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:9000/users/${authUser._id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
                    }
                });

                if (response.status === 200) {
                    const userData = response.data.user;
                    setNewImage(userData.image);
                    setNewUserName(userData.username);
                    setNewAbout(userData.about);
                }
            } catch (error) {
                console.log('Error fetching user profile:', error);
            }
        };

        fetchProfile();
    }, [authUser._id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('username', newUserName);
            formData.append('about', newAbout);
            if (newImage) formData.append('image', newImage);

            const response = await axios.patch(`http://localhost:9000/users/updateProfile/${authUser._id}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            const updatedUser = response.data.user
            localStorage.setItem('chat-user', JSON.stringify(updatedUser));
            setAuthUser(updatedUser);
            toast.success('Profile Updated Successfully');
            Nvgt('/chat');
        } catch (error) {
            console.error('Error updating profile:', error.response?.data || error.message);
            toast.error('Failed to update profile. Please try again.');
        }
    };


    return (
        <Component>
            <Header>
                <Toolbar></Toolbar>
            </Header>
            <Dialog open={true} PaperProps={{ sx: dialogStyle }} hideBackdrop={true}>
                <div className="container-fluid" style={{ position: 'absolute', top: '13%', left: '30%' }}>
                    <div><h3 style={{ padding: '10px', color: 'darkgreen', fontFamily: 'serif', fontSize: '35px' }}>Update Your Profile</h3></div>
                    <div style={{ textAlign: 'center', padding: '15px' }}>
                    </div>
                </div>
                <div className="container-fluid" style={{ position: 'absolute', top: '20%', left: '35%' }}>
                    <input id="imageInput" type="file" style={{ display: 'none' }} ref={fileInputRef} onChange={handleFileChange} />
                    {previewImage ? (
                        <img src={previewImage} onClick={handleImageClick} alt="Profile" style={{ width: 200, height: 200, borderRadius: '50%', padding: '25px 0', cursor: 'pointer' }} />
                    ) : authUser.image ? (
                        <img src={authUser.image} onClick={handleImageClick} alt="Profile" style={{ width: 200, height: 200, borderRadius: '50%', padding: '25px 0', cursor: 'pointer' }} />
                    ) : (
                        <img src={NoDp} onClick={handleImageClick} alt="Profile" style={{ width: 200, height: 200, borderRadius: '50%', padding: '25px 0', cursor: 'pointer' }} />
                    )}
                </div>
                <div className="container-fluid" style={{ position: 'absolute', top: '30%', left: '35%' }}>
                    <TextField type="text" value={newUserName} onChange={(e) => setNewUserName(e.target.value)} label="Enter Your Name...." variant="standard" style={{ position: 'absolute', top: '100px' }} />
                    <TextField type="text" value={newAbout} onChange={(e) => setNewAbout(e.target.value)} label="About...." variant="standard" style={{ position: 'absolute', top: '150px' }} />
                    <Button style={{ position: 'absolute', left: '70px', top: '230px' }} className="bg-success" variant="contained" onClick={handleSubmit}>Save</Button>
                </div>
            </Dialog>
        </Component>
    );
};

export default ProfileEdit;
