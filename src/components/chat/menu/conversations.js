import React, { useContext, useEffect } from 'react'
// import { getUsers } from '../../../service/api'
import Conversation from './conversation'
import { Box, Divider, styled } from '@mui/material'
import { userContext } from '../../../App'
import { Axios } from 'axios'
import { toast } from 'react-toastify'

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
  /*   const [users,setUsers] = useState([])
    useEffect(()=>{
   const fetchData = async () =>{
    const response = await getUsers()
    setUsers(response)
   }
   fetchData()
    },[]) */
  const { user, setUser } = useContext(userContext)
  
  useEffect(() => {
    const admnFetchUsers = async () => {
      try {
        const rspns = await Axios.get('http://localhost:4000/users/all')
        console.log(rspns.data.data.findUser);
        setUser(rspns.data.data.findUser)
      } catch (err) {
        toast.error(err)
      }
    }
    admnFetchUsers()
  }, [setUser])

  return (
    <Component>
      {user.map((usr) => (
        <div key={usr.id}>
          <Conversation usr={usr} />
          <StyledDivider />
        </div>
      ))}

    </Component>
  )
}

export default Conversations