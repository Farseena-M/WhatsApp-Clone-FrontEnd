import { useEffect, useState } from "react"
import { Axios } from "../App"
import useConversation from "./zustand"

const url = 'http://localhost:4000'

export const useGetConversations = () => {
    const [loading, setLoading] = useState(false)
    const [conversations, setConversations] = useState([])
    useEffect(() => {
        const getConversations = async () => {
            setLoading(true)
            try {
                const res = await Axios.get(`${url}/users/all`)
                const data = res.data.data
                setConversations(data)
            } catch (err) {
                console.log(err.message);
            } finally {
                setLoading(false)
            }
        }
        getConversations()
    }, [])
    return { loading, conversations }
}







export const useSendMessages = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    const sendMessages = async (message) => {
        setLoading(true);
        try {
            const res = await Axios.post(`${url}/users/messages/send/${selectedConversation._id}`, { message });
            const data = res.data;
            if (data.error) throw new Error(data.error);
            setMessages([...messages, data]);
        } catch (err) {
            console.log(err.message);
        } finally {
            setLoading(false);
        }
    };
    return { sendMessages, loading };
};






export const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation()

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true)
            try {
                const res = await Axios.get(`${url}/users/messages/${selectedConversation._id}`)
                const data = res.data
                if (data.error) throw new Error(data.error);
                setMessages(data)
            } catch (error) {
                console.log(error.message);
            } finally {
                setLoading(false)
            }
        }
        if (selectedConversation?._id) getMessages()
    }, [selectedConversation?._id, setMessages])
    return { messages, loading }
}


