import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./pages/Home";

const socket = io.connect("http://localhost:8000");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [userId, setUserId] = useState("");

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };
  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>

          <input
            type="text"
            placeholder="Your Name...(for now it can be any)"
            onChange={(event) => {
              setUsername(event.target.value);

            }}
          />
          <input
            type="text"
            placeholder="Your ID..."
            onChange={(event) => {
              setUserId(event.target.value);

            }}
          />
          <input
            type="text"
            placeholder="Room ID...(Ex.123)"
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} senderId={userId} />
      )}
    </div>
  );
}

export default App;
