import { createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import socketIOClient from 'socket.io-client'


const WS = 'http://localhost:4000'
export const RoomContext = createContext(null);
const ws = socketIOClient(WS)
export const RoomProvider = ({ children ,selectedConversation}) => {
    const Nvgt = useNavigate()
    const enterRoom = ({ roomId }) => {
        console.log({ roomId });
        Nvgt(`/room/${roomId}`)
    }
    useEffect(() => {
        ws.on('room-created', enterRoom)
    }, [])
    return (
        <RoomContext.Provider value={{ ws,selectedConversation }}>
            {children}
        </RoomContext.Provider>
    );
};
