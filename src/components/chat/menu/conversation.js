import { Box, Typography,styled } from '@mui/material'
import React from 'react'
import dp from '../../assets/Butterfly.png'


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


const Conversation = ({usr}) => {
    
    return (
        
            <Component>
            <Box>
                <Image src={dp} alt='dp' />
            </Box>
            <Box>
                <Box>
                    <Typography style={{fontFamily:'inherit',padding:'10px 10px'}}>Name</Typography>
                </Box>
            </Box>
        </Component>
        )
}

export default Conversation