import React, { useEffect, useState } from "react";
import "./ShowChat.scss";
import { jwtDecode } from 'jwt-decode';

function ShowChat() {
  const [messageList, setMessageList] = useState([]);
  const user = jwtDecode(localStorage.getItem('token'));
  const chatId = '65b7324df125cc2f722cd65e';
  
  useEffect(() => {
    const fetchMessages = async () => {
       
      try {
        const response = await fetch(`http://localhost:8000/messages/fetch/${chatId}`);
        if (response.ok) {
          const { result: messages } = await response.json();
          setMessageList(messages);
        } else {
          console.error('Failed to fetch messages:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [chatId]);

  return (
    <>{messageList.map((messageContent) => (
        <div
          className="message"
        //   key={messageContent.sender.id}
          id={user.id === messageContent.sender.id ? "you" : "other"}
        >
          <div>
            <div className="message-content">
              <p>{messageContent.content}</p>
            </div>
            <div className="message-meta">
              <p id="author">{messageContent.sender.name}</p>
            </div>
          </div>
        </div>
      ))}
    </>
          
  );
}

export default ShowChat;
