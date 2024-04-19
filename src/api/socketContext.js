// import { createContext, useEffect, useState } from 'react'
// import io from 'socket.io-client'

// export const SocketContext = createContext()

// export const SocketContextProvider = ({ children }) => {
//     const [socket, setSocket] = useState(null)
//     const [onlineUsers, setOnlineUsers] = useState([])
//     const userId = localStorage.getItem('userId')

//     useEffect(() => {
//         if (userId) {
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
//         <SocketContextProvider value={{ socket, setSocket, onlineUsers, setOnlineUsers }}>
//             {children}
//         </SocketContextProvider>
//     )
// }