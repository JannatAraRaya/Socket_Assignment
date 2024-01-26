import React, { useState, useEffect } from 'react';
import ScrollToBottom from "react-scroll-to-bottom";
import io from 'socket.io-client';
import {
  Button,
} from "@mui/material";
const ChatComponent = () => {
  const [currentMessage, setCurrentMessage] = useState([]);
  const [sender, setSender] = useState([]);
  const [receiver, setReceiver] = useState([]);
  const [messageList, setMessageList] = useState([]);

  const socket = io('http://localhost:3000');
  const sendMessage = () => {
    // const sender = "65b35a72bd89bab58ab49bbe"; 
    // const receiver = "65b35a95bd89bab58ab49bc1"; 
    const messageData = {
      message: currentMessage,
      sender: sender,
      receiver: receiver
    }
    fetch('http://localhost:8000/chats/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sender, receiver, text: currentMessage }),
    });

    socket.emit("send_message", messageData);
    // socket.on("send_message", () => {
    //   console.log("message_send", messageData);
    // })
    setMessageList((list) => [...list, messageData]);
    setCurrentMessage("");
  };
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);




  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage();
  };

  return (
    <div>
      <div >
        <ScrollToBottom >
          {messageList.map((messageContent) => {
            return (
              <div
                id={sender === messageContent.sender ? "you" : "other"}
              >
                <div>
                  <div>
                    <p>{messageContent.message}</p>
                  </div>
                  <div >
                    <p >{messageContent.sender}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          value={sender}
          //  value={inputMessage}
          onChange={(e) => setSender(e.target.value)}
          label="sender"
        />
        <input
          value={receiver}
          //  value={inputMessage}
          onChange={(e) => setReceiver(e.target.value)}
          label="receiver"
        />
        <input
          type="text"
          value={currentMessage}
          //  value={inputMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          label="Message"
        />

        <Button type="submit" variant="contained" color="primary">
          Send
        </Button>
      </form>
    </div>
  );
};

export default ChatComponent;
