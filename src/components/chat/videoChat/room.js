import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const Room = ({ roomId }) => {
    const [localStream, setLocalStream] = useState(null);
    const remoteVideoRef = useRef();
    const socket = useRef();
        useEffect(() => {
        const initVideoCall = async () => {
            socket.current = io();

            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                setLocalStream(stream);

                const localVideo = document.createElement('video');
                localVideo.srcObject = stream;
                localVideo.muted = true;
                localVideo.play();
                document.getElementById('local-video').appendChild(localVideo);

                const peerConnection = new RTCPeerConnection();
                stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));
                socket.current.on('offer', async (data) => {
                    await peerConnection.setRemoteDescription(data.offer);
                    const answer = await peerConnection.createAnswer();
                    await peerConnection.setLocalDescription(answer);
                    socket.current.emit('answer', { roomId: data.roomId, answerer: socket.current.id, receiver: data.caller, answer: answer });
                });

                socket.current.on('answer', async (data) => {
                    await peerConnection.setRemoteDescription(data.answer);
                });

                socket.current.on('ice-candidate', async (data) => {
                    await peerConnection.addIceCandidate(data.candidate);
                });

                const offer = await peerConnection.createOffer();
                await peerConnection.setLocalDescription(offer);
                socket.current.emit('offer', { roomId: roomId, caller: socket.current.id, receiver: '', offer: offer });
                
            } catch (error) {
                console.error('Error accessing media devices:', error);
            }
        };

        initVideoCall();

        return () => {
            if (localStream) {
                localStream.getTracks().forEach((track) => track.stop());
            }
            socket.current.disconnect();
        };
    }, [roomId]);

    const sendInvitation = () => {
            socket.current.emit('send-invitation', { invitationSender: socket.current.id, invitationReceiver: ''});
         };

    return (
        <div>
            <div id="local-video"></div>
            <video ref={remoteVideoRef} autoPlay />
            <button onClick={sendInvitation}>Send Invitation</button>
        </div>
    );
};

export default Room;
