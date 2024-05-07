import React, { useState } from 'react';
import { Button, Modal, Fade, TextField, styled } from '@mui/material';
import axios from 'axios';

const Text = styled(TextField)`
padding:10px;
width:100%;
`


const GroupChatModal = ({ isOpen, onClose }) => {
    const [groupChatName, setGroupChatName] = useState()
    const [selectedUsers, setSelectedUsers] = useState([])
    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [loading, setLoading] = useState(false)


    const handleSearch = async(query) =>{
setSearch(query)
if(!query){
    return
}
try {
    setLoading(true)
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}` 
        }
    }
    const rsps = await axios.get(`http://localhost:4000/users/all?search=${search}`, config);
    console.log(rsps.data.data);
    const data = rsps.data.data
    setLoading(false)
    setSearchResults(data)
} catch (error) {
    console.log(error.message);
}
    }
    const handleSubmit = () =>{}
    return (
        <>
            <Modal
                open={isOpen}
                onClose={onClose}
            >
                <Fade in={isOpen}>
                    <div style={{
                        backgroundColor: '#FFFFFF',
                        border: '2px solid #000',
                        padding: '20px',
                        maxWidth: '400px',
                        margin: 'auto',
                        marginTop: '100px',
                    }}>
                        <h2 style={{fontFamily:'sans-serif',textAlign:'center',color:'#00A884'}}>Create Group Chat</h2>
                        <Text
                            label="Chat Name.."
                            variant="outlined"
                            
                        />
                        <Text
                            label="Add Users.."
                            variant="outlined"
                            onClick = {(e)=>handleSearch(e.target.value)}
                        />
                        <br />
                        <Button color="primary" onClick={handleSubmit} style={{ marginRight: '10px',position:'relative',left:'100px' ,color:'#00A884'}}>
                            Create Chat
                        </Button>
                    </div>
                </Fade>
            </Modal>
        </>
    );
}

export default GroupChatModal;
