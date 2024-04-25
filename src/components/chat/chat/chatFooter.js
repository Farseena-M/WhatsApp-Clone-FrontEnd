import React, { useState } from 'react';
import { useSendMessages } from '../../../api/api';
import { Box, InputBase, styled } from '@mui/material';
import { EmojiEmotionsOutlined, AttachFile } from '@mui/icons-material';
import SendIcon from '@mui/icons-material/Send';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'


const Container = styled(Box)`
  height: 55px;
  background: #ededed;
  display: flex;
  width: 100%;
  align-items: center;
  padding: 0 15px;
  & > * {
    margin: 5px;
    color: #919191;
    cursor: pointer;
  }
`;

const Search = styled(Box)`
  background-color: #ffffff;
  border-radius: 18px;
  width: calc(100% - 100px);
`;

const InputField = styled(InputBase)`
  width: 100%;
  padding: 20px;
  height: 20px;
  padding-left: 25px;
  font-size: 14px;
`;

const Clip = styled(AttachFile)`
  transform: rotate(40deg);
`;


const ChatFooter = () => {
  const [message, setMessage] = useState('');
  const { loading, sendMessages } = useSendMessages();
  const [showEmoji, setShowEmoji] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessages(message);
    setMessage('');
  };

  const addEmoji = (e) => {
    const emg = e.unified.split('_')
    // console.log(emg);
    const codeArray = []
    emg.forEach((el) => codeArray.push('0x' + el))
    let emoji = String.fromCodePoint(...codeArray)
    setMessage(message + emoji)
  }

  return (
    <Container >
      <EmojiEmotionsOutlined onClick={() => setShowEmoji(!showEmoji)} />
      <div style={{ position: 'absolute', top: '290px', right: '90' }}>
        {showEmoji && <Picker data={data}
          theme={'light'}
          onEmojiSelect={addEmoji}
          emojiButtonSize={'28'}
          emojiSize={'20'}
          maxFrequentRows={'0'}
        />}
      </div>
      {/* <Clip /> */}
      <Search>
        <InputField
          placeholder="Type a message"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
      </Search>
      {/* <Mic /> */}
      <button type="submit" onClick={handleSubmit} style={{ border: 'none' }}>
        {loading ? <div className="loading loading-spinner"></div> : <SendIcon />}
      </button>
    </Container>
  );
};

export default ChatFooter;
