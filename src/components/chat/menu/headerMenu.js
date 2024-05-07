import React, { useContext, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu, MenuItem } from '@mui/material';
import styled from '@emotion/styled';
import { userContext } from '../../../App';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../AccountContext/accountContext';
import GroupChatModal from './groupChatModal';

const MenuOption = styled(MenuItem)`
  font-size: 14px;
  padding: 15px 60px 5px 24px;
  color: #4A4A4A;
`;

function HeaderMenu({ setOpenDrawer }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const Nvgt = useNavigate();
    const { open, setOpen } = useContext(userContext);
    const { setAuthUser } = useAuthContext();

    const handleClose = () => {
        setOpen(false);
    };

    const handleClick = (e) => {
        setOpen(e.currentTarget);
    };

    const logoutUser = () => {
        localStorage.clear();
        setAuthUser(null);
        toast.success('Logout Success');
        Nvgt('/');
        window.location.reload();
    };

    const handleCreateGroup = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <MoreVertIcon onClick={handleClick} style={{ cursor: 'pointer' }} />
            <Menu
                anchorEl={open}
                keepMounted
                open={Boolean(open)}
                onClose={handleClose}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuOption onClick={handleCreateGroup}>Create Group</MenuOption>
                <MenuOption onClick={() => { handleClose(); setOpenDrawer(true); }}>Profile</MenuOption>
                <MenuOption onClick={() => Nvgt(`/profile`)}>Settings</MenuOption>
                <MenuOption onClick={logoutUser}>Logout</MenuOption>
            </Menu>
            <GroupChatModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </>
    );
}

export default HeaderMenu;
