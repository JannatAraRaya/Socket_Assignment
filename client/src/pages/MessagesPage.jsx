import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, TextField, Button, List, ListItem, ListItemText } from '@material-ui/core';
import {  Typography,Grid ,FormControl,Input} from '@mui/material';
import {ChatState} from "../context/contextProvider";
import axiosInstance from '../utils/axiosInstance';

const MessagesPage=()=> {
    const { selectedChat, setSelectedChat} = ChatState();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [istyping,setIsTyping] =useState([])
  
    const sendMessage =async (e) =>{

        const check= localStorage.getItem("token");
        if (e.key === "Enter" && newMessage) {

        const config = {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${check}`,
            },
          };
          setNewMessage("");
          const { data } = await axiosInstance.post(
            "/messages/send",
            {
              content: newMessage,
              chatId: selectedChat,
            },
            config
          );
        
          setMessages([...messages, data]);
        
        
        }
    }
    const typingHandler= () => {
 
    };
  
    return (
      <Grid container spacing={2} style={{ height: '80vh' }}>
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: '20px', height: '100%', overflowY: 'auto' }}>
            {messages.map((message, index) => (
              <Typography key={index} variant="body1">
                <strong>{message.sender}:</strong> {message.content}
              </Typography>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <TextField
              fullWidth
              variant="outlined"
              label="Type your message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            {/* <FormControl
              onKeyDown={sendMessage}
              mt={3}
            >
                <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message.."
                value={newMessage}
                onChange={typingHandler}
              />
            </FormControl> */}
            <Button variant="contained" color="primary" style={{ marginTop: '10px' }} onClick={handleSendMessage}>
              Send
            </Button>
          </Paper>
        </Grid>
      </Grid>
    );
}

export default MessagesPage;



