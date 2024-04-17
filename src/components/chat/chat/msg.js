import { Box, Typography, styled } from '@mui/material'
import React from 'react'

const Own = styled(Box)`
background:#dcf8c6;
max-width:60%;
margin-left:auto;
padding:5px;
width:fit-content;
display:flex;
border-radius:10px;
word-break:break-word;
`
// const Wrapper = styled(Box)`
// background:#FFFFFF;
// max-width:60%;
// padding:5px;
// width:fit-content;
// display:flex;
// border-radius:10px;
// word-break:break-word;
// `
const Text = styled(Typography)`
font-size:14px;
padding: 0 25px 0 5px ;
`

const Time = styled(Typography)`
font-size:10px;
color:#919191;
margin-top:6px;
word-break:keep-all;
margin-top:auto;
`

const Msg = () => {


    // const formatDate = (date) => {
    //     const hours = new Date(date).getHours()
    //     const minutes = new Date(date).getMinutes()
    //     return `${hours < 10 ? '0' + hours : hours} : ${minutes < 10 ? '0' + minutes : minutes}`
    // }

    return (
        <>
            <Own>
                <Text>hii</Text>
                <Time>7</Time>
            </Own>
        </>
    )
}

export default Msg