import React, { useState } from "react";
import { useWebSockets } from "../hooks/useWebSockets";

const SocketConnect = () => {
  const [valueRoom, setValueRoom] = useState("" as any);
  const [inputMessage, setInputMessage] = useState("");
  const { send, room, messageReceived } = useWebSockets({
    userId: 2,
    enable: true,
    url: "http://localhost:5001",
    roomId: valueRoom,
  });
  const joinRoom = () => {
    if (valueRoom !== "") {
      room();
    }
  };
  const sendMessage = () => {
    send(inputMessage);
  };
  return (
    <div className="App">
      {/* join room */}
      <input
        type="text"
        placeholder="Room Number..."
        onChange={(event) => setValueRoom(event.target.value)}
      />
      <button onClick={joinRoom}>Join room</button>
      <br />
      {/* send-message */}
      <input
        type="text"
        placeholder="Message"
        onChange={(event) => setInputMessage(event.target.value)}
      />
      <button onClick={sendMessage}>Send Message</button>
      <h1>Message: {messageReceived}</h1>
    </div>
  );
};

export default SocketConnect;
