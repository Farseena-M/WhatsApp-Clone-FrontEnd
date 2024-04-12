import React, { useContext } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu, MenuItem } from '@mui/material';
import styled from '@emotion/styled';
import { userContext } from '../../../App';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


const MenuOption = styled(MenuItem)`
font-size:14px;
padding:15px 60px 5px 24px;
color:#4A4A4A;
`

function HeaderMenu({ setOpenDrawer }) {
    const Nvgt = useNavigate()
    const { setUser, open, setOpen } = useContext(userContext)
    const handleClose = () => {
        setOpen(false)
    }
    const handleClick = (e) => {
        setOpen(e.currentTarget)
    }

    const logoutUser = () => {
        localStorage.clear()
        setUser(null)
        toast.success('Logout Success')
        Nvgt('/')
    }
    return (
        <>
            <MoreVertIcon onClick={handleClick} style={{ cursor: 'pointer' }} />
            <Menu
                anchorEl={open}
                keepMounted
                open={Boolean(open)}
                onClose={handleClose}
                getcontentanchore1={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuOption onClick={() => { handleClose(); setOpenDrawer(true); }}>Profile</MenuOption>
                <MenuOption onClick={logoutUser}>Logout</MenuOption>
            </Menu>
        </>
    )
}

export default HeaderMenu