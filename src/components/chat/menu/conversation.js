import { Box, Typography, styled } from '@mui/material'
import React, { useContext } from 'react'
import { userContext } from '../../../App'

const Component = styled(Box)`
display:flex;
height:'45px';
padding:13px 0;
cursor:pointer;
`
const Image = styled('img')({
    height: '45px',
    width: '75px',
    borderRadius: '50%',
    padding: '0 14px',
    objectFit: 'cover'
})


const Conversation = ({ usr }) => {

    const { setPerson } = useContext(userContext)

    const getUser = async () => {
        setPerson(usr);
    }

    return (

        <Component onClick={() => getUser()}>
            <Box>
                <Image src={usr.image} alt={usr.name} />
            </Box>
            <Box>
                <Box>
                    <Typography style={{ fontFamily: 'inherit', padding: '10px 10px' }}>{usr.name}</Typography>
                </Box>
            </Box>
        </Component>
    )
}

export default Conversation