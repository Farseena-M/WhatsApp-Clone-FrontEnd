import React from 'react'
import Conversation from './conversation'
import { Box, Divider, styled } from '@mui/material'
// import { userContext } from '../../../App'
// import { Axios } from 'axios'
// import { toast } from 'react-toastify'


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
  /*   const { user, setUser } = useContext(userContext)
  
    useEffect(() => {
      const admnFetchUsers = async () => {
        try {
          const rspns = await Axios.get('http://localhost:4000/users/all')
          console.log(rspns.data.data);
          setUser(rspns.data.data)
        } catch (err) {
          toast.error(err)
        }
      }
      admnFetchUsers()
    },[]) */

  return (
    <Component>


      <Conversation />
      <StyledDivider />


    </Component>
  )
}

export default Conversations