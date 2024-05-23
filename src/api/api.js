import { useEffect, useState } from "react";
import axios from "axios";
import useConversation from "./zustand";

export const useGetConversation = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  let authorization;
  if (typeof window !== 'undefined') {
    authorization = "Bearer " + (localStorage.getItem("userToken") || '');
  } else {
    authorization = '';
  }

  useEffect(() => {
    const getConversation = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "https://api.zaptalk.site/users/all",
          {
            headers: {
              Authorization: authorization,
            },
          }
        );
        if (res.status === 200) {
          setConversations(res.data.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getConversation();
  }, [authorization]);

  return { loading, conversations };
};






export const useSendMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  let authorization;
  if (typeof window !== 'undefined') {
    authorization = "Bearer " + (localStorage.getItem("userToken") || '');
  } else {
    authorization = '';
  }

  const sendMessages = async (message) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.zaptalk.site/users/messages/send/${selectedConversation._id}`,
        {
          method: "post",
          headers: {
            "Content-type": "application/json",
            Authorization: authorization,
          },
          body: JSON.stringify({ message }),
        }
      )
      const data = await res.json()
      if (data.error) throw new Error(data.error)

      setMessages([...messages, data]);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return { sendMessages, loading };
};





export const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  let authorization;
  if (typeof window !== 'undefined') {
    authorization = "Bearer " + (localStorage.getItem("userToken") || '');
  } else {
    authorization = '';
  }

  useEffect(() => {
    const getMessages = async () => {
      if (!selectedConversation || !selectedConversation._id) {
        return; 
      }

      setLoading(true);
      try {
        const res = await fetch(`https://api.zaptalk.site/users/messages/${selectedConversation._id}`, {
          headers: {
            Authorization: authorization,
          },
        });
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setMessages(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    

    if (selectedConversation?._id) getMessages();
  }, [selectedConversation._id,setMessages, authorization]);

  return { messages, loading };
};
