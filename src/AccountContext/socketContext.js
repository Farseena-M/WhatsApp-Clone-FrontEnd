import { createContext, useContext, useEffect, useState } from 'react'
import { useAuthContext } from './accountContext'
import io from 'socket.io-client'

const SocketContext = createContext()

export const useSocketContext = () =>{
    return useContext(SocketContext)
}

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const { authUser } = useAuthContext()

    useEffect(() => {
        if (authUser) {
            const socket = io('http://localhost:4000', {
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
    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    )
}