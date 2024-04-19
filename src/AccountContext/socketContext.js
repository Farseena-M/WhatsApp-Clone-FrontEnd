// import { createContext, useEffect, useState } from 'react'
// import {useAuthContext} from './accountContext'
// import io from 'socket.io-client'

// export const SocketContext = createContext()

// export const SocketContextProvider = ({ children }) => {
//     const [socket, setSocket] = useState(null)
//     const [onlineUsers, setOnlineUsers] = useState([])
//     const {authUser} = useAuthContext()

//     useEffect(() => {
//         if (authUser) {
//             const socket = io('http://localhost:4000')
//             setSocket(socket)
//             return () => socket.close()
//         } else {
//             if (socket) {
//                 socket.close()
//                 setSocket(null)
//             }
//         }
//     })
//     return (
//         <SocketContextProvider value={{ socket, onlineUsers }}>
//             {children}
//         </SocketContextProvider>
//     )
// }