import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import ShowChat from "./ShowChat";



function Chat({ socket, username, room ,senderId}) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  // const user = jwtDecode(localStorage.getItem('token'));
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        // sender:senderId,
        content: currentMessage,
      };

      const chatId = '65b7324df125cc2f722cd65e';
      // const jwtToken = localStorage.getItem('token');
      try {
        const response = await fetch('http://127.0.0.1:8000/messages/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${jwtToken}`
          },
          body: JSON.stringify({
            content: currentMessage,
            chatId: chatId,
            sender:senderId
          })
        });

        if (response.ok) {
          await socket.emit("send_message", messageData);
          setMessageList((list) => [...list, messageData]);
          setCurrentMessage("");
        } else {
          console.error('Failed to send message:', response.statusText);
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }    
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Chat</p>
      </div>
      <div className="chat-body">
   
        <ScrollToBottom 
        className="message-container">
            <ShowChat senderId={senderId}/>
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.content}</p>
                  </div>
                  {/* <div className="message-meta">
                    <p id="author">{messageContent.author}</p>
                  </div> */}
                </div>
              </div>
            );
          })} 
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;
