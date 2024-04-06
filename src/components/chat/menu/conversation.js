import { Box, Typography,styled } from '@mui/material'
import React from 'react'


const Component = styled(Box)`
display:flex;
height:'45px';
padding:13px 0;
cursor:pointer;
`
const Image = styled('img')({
    height:'45px',
    width:'75px',
    borderRadius:'50%',
    padding:'0 14px',
    objectFit:'cover'
})


const Conversation = ({ user }) => {
    return (
        <Component>
            <Box>
                <Image src={user.picture} alt='dp' />
            </Box>
            <Box>
                <Box>
                    <Typography style={{fontFamily:'inherit',padding:'10px 10px'}}>{user.name}</Typography>
                </Box>
            </Box>
        </Component>
    )
}

export default Conversation