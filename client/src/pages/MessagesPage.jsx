import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, TextField, Button, List, ListItem, ListItemText } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme.spacing(2),
      maxWidth: 400,
      margin: 'auto',
      marginTop: theme.spacing(4),
    },
    messageList: {
      maxHeight: 200,
      overflowY: 'auto',
    },
    inputContainer: {
      display: 'flex',
      marginTop: theme.spacing(2),
    },
    input: {
      flex: 1,
    },
  }));
const MessagesPage=()=> {
    const classes = useStyles();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
  
    const handleSendMessage = () => {
      if (newMessage.trim() !== '') {
        setMessages([...messages, { id: messages.length, content: newMessage }]);
        setNewMessage('');
      }
    };
    return (
        <Paper className={classes.root}>
          <List className={classes.messageList}>
            {messages.map((message) => (
              <ListItem key={message.id}>
                <ListItemText primary={message.content} />
              </ListItem>
            ))}
          </List>
          <div className={classes.inputContainer}>
            <TextField
              className={classes.input}
              label="Type your message"
              variant="outlined"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleSendMessage}>
              Send
            </Button>
          </div>
        </Paper>
      );
}

export default MessagesPage;



