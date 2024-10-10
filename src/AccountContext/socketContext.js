import { createContext, useContext, useEffect, useState } from 'react'
import { useAuthContext } from './accountContext'
import io from 'socket.io-client'
import useConversation from '../api/zustand'

const SocketContext = createContext()

export const useSocketContext = () => {
    return useContext(SocketContext)
}

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const { authUser } = useAuthContext()
    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);
    const [peerConnection, setPeerConnection] = useState(null);
    const { selectedConversation } = useConversation();


    useEffect(() => {
        if (authUser) {
            const socket = io('http://localhost:9000/', {
                query: {
                    userId: authUser._id
                }
            })
            setSocket(socket)

            //socket.on() used to listen the events.

            socket.on('getOnlineUsers', (users) => {
                setOnlineUsers(users)
            })


            // VideoCall Signaling

            socket.on('receiveOffer', async ({ offer, senderId }) => {
                console.log('Received offer:', offer); 
                const pc = createPeerConnection();
                
                if (offer) { 
                    await pc.setRemoteDescription(new RTCSessionDescription(offer));
                    const answer = await pc.createAnswer();
                    await pc.setLocalDescription(answer);
                    socket.emit('sendAnswer', { answer, senderId });
                } else {
                    console.error("Received null offer.");
                }
            });


            socket.on('receiveAnswer', async ({ answer, receiverId }) => {
                await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
            });


            socket.on('receiveIceCandidate', async ({ candidate, senderId }) => {
                await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
            });



            return () => socket.close()
        } else {
            if (socket) {
                socket.close()
                setSocket(null)
            }
        }
    }, [authUser])


    const createPeerConnection = () => {
        const pc = new RTCPeerConnection();

        pc.onicecandidate = (event) => {
            if (event.candidate) {
                socket.emit('sendIceCandidate', {
                    candidate: event.candidate,
                    receiverId: selectedConversation._id,
                });
            }
        };

        pc.ontrack = (event) => {
            setRemoteStream(event.streams[0]);
        };

        if (localStream) {
            localStream.getTracks().forEach((track) => {
                pc.addTrack(track, localStream);
            });
        }

        setPeerConnection(pc);
        return pc;
    };


    return (
        <SocketContext.Provider value={{ socket, onlineUsers, localStream, setLocalStream, remoteStream }}>
            {children}
        </SocketContext.Provider>
    )
}