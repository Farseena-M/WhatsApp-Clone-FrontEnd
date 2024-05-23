import { createContext, useContext, useEffect, useState } from 'react'
import { useAuthContext } from './accountContext'
import io from 'socket.io-client'
import { GLOBALTYPES } from '../redux/action/globalType'
// import { useDispatch } from 'react-redux'

const SocketContext = createContext()

export const useSocketContext = () =>{
    return useContext(SocketContext)
}

export const SocketContextProvider = ({ children }) => {
    // const dispatch = useDispatch()
    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const { authUser } = useAuthContext()

    useEffect(() => {
        if (authUser) {
            const socket = io('https://api.zaptalk.site', {
                query: {
                    userId: authUser._id
                }
            })
            setSocket(socket)

            //socket.on() used to listen the events. Can be used both on the client and server side.

            socket.on('getOnlineUsers', (users) => {
                setOnlineUsers(users)
            })

            return () => socket.close()
        } else {
            if (socket) {
                socket.close()
                setSocket(null)
            }
        }
    }, [authUser])


   // call user

//    useEffect(()=>{
//      socket.on('callUserToClient', data =>{
//          dispatch({type:GLOBALTYPES.CALL, payload:data})
//      })
//         return () => socket.off('callUserToClient')
//    },[socket, dispatch])


    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    )
}