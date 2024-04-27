import React, { useEffect } from 'react'
import { useSocketContext } from '../AccountContext/socketContext'
import useConversation from './zustand'

const useListenMessages = () => {
    const { socket } = useSocketContext()
    const { messages, setMessages } = useConversation()
    useEffect(() => {
        socket?.on('newMessag', (newMessage) => {
            setMessages([...messages, newMessage])
        })
        return () => socket?.off('newMessage')
    }, [socket, setMessages, messages])
}

export default useListenMessages