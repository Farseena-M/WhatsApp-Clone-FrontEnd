import React, { useContext, useEffect, useState } from 'react'
import { getUsers } from '../../../service/api'
import Conversation from './conversation'
import { Box ,Divider,styled} from '@mui/material'
import {AccoundContext } from '../../../context/accoundProvider'

const Component = styled(Box)`
height:81vh;
overflow:overlay;
`
const StyledDivider = styled(Divider)`
margin:0 0 0 70px;
background-color:#e9edef;
opacity:0.6;
`


const Conversations = () => {
    const [users,setUsers] = useState([])
    const {account} = useContext(AccoundContext)
    useEffect(()=>{
   const fetchData = async () =>{
    const response = await getUsers()
    setUsers(response)
   }
   fetchData()
    },[])
  return (
    <Component>
     {
        users.map(user=>(
            // user.sub !== account.sub &&
            <>
            <Conversation user={user} />
            <StyledDivider />
            </>
        ))
     }
    </Component>
  )
}

export default Conversations