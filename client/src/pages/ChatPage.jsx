import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Box, Input, Button } from '@material-ui/core';
import axiosInstance from '../utils/axiosInstance';
import io from 'socket.io-client';

const ENDPOINT = 'http://localhost:3000';
let socket;

const SingleChat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socketConnected, setSocketConnected] = useState(false);
  const jwtToken = localStorage.getItem('token');
  const user = jwtToken ? jwtDecode(jwtToken) : null;

  const sendMessage = async () => {
    try {
      const chatId = '65b7324df125cc2f722cd65e';
      const jwtToken = localStorage.getItem('token');
      const user = jwtToken ? jwtDecode(jwtToken) : null;
      const response = await axiosInstance.post(
        '/messages/send',
        { content: newMessage, chatId },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      setMessages((prevMessages) => [...prevMessages, response.data]);
      if (socketConnected) {
        socket.emit('sendMessage', { userId: user.id, content: newMessage });
      }
      setNewMessage(''); 
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const fetchMessages = async () => {
    try {
      const jwtToken = localStorage.getItem('token');
      const decodedToken = jwtToken ? jwtDecode(jwtToken) : null;
      console.log(decodedToken.id);
      const response = await axiosInstance.get('http://127.0.0.1:8000/messages/fetch');
      console.log(response.data);
      setMessages(response.data.result);
      console.log('Joined Room ', decodedToken.id);
      socket.emit('Joined Room', decodedToken.id);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.on("connected", () => {
      setSocketConnected(true);
      socket.emit("joinRoom", user.id);
    });

    socket.on("messageReceived", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    fetchMessages();
    return () => {
      socket.disconnect();
    };
  }, []); 

  return (
    <Box>
      <div>
        <h2>Messages</h2>
        <ul>
          {messages.map((message) => (
            <li key={message._id}>
              {message.sender.name}: {message.content}
            </li>
          ))}
        </ul>
      </div>

      <Box display="flex" alignItems="center">
        <Input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={sendMessage}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default SingleChat;
