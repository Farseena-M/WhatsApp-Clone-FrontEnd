// import React, { useContext, useEffect } from 'react'
// import { useParams } from 'react-router-dom'
// import { RoomContext } from '../../../AccountContext/roomContext'

// const Room = () => {
//     const {id} = useParams()
//     const {ws} = useContext(RoomContext)
//     useEffect(()=>{
//   ws.emit('join-room',{roomId:id})
//     },[id])
//   return (
//     <div>room ${id}</div>
//   )
// }
// export default Room

import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const Room = ({ roomId }) => {
  const [localStream, setLocalStream] = useState(null);
  const remoteVideoRef = useRef();
  const socket = useRef();

  useEffect(() => {
    const initVideoCall = async () => {
      // Initialize Socket.io connection
      socket.current = io();

      try {
        // Request access to user's camera and microphone
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setLocalStream(stream);

        // Display local video stream
        const localVideo = document.createElement('video');
        localVideo.srcObject = stream;
        localVideo.muted = true;
        localVideo.play();
        document.getElementById('local-video').appendChild(localVideo);

        // Create WebRTC peer connection
        const peerConnection = new RTCPeerConnection();
        stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));

        // Handle incoming offers, answers, and ICE candidates
        socket.current.on('offer', async (data) => {
          await peerConnection.setRemoteDescription(data.offer);
          const answer = await peerConnection.createAnswer();
          await peerConnection.setLocalDescription(answer);
          socket.current.emit('answer', { to: data.from, answer: answer });
        });

        socket.current.on('answer', async (data) => {
          await peerConnection.setRemoteDescription(data.answer);
        });

        socket.current.on('ice-candidate', async (data) => {
          await peerConnection.addIceCandidate(data.candidate);
        });

        // Send offer to peer
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        socket.current.emit('offer', { to: roomId, offer: offer });
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

  return (
    <div>
      <div id="local-video"></div>
      <video ref={remoteVideoRef} autoPlay />
    </div>
  );
};

export default Room;


