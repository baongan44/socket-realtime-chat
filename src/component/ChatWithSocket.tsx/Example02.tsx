import React, { useState } from "react";
import { io } from "socket.io-client";
import FormChat from "./FormChat";
import JoinToChat from "./JoinToChat";

const socket = io("http://localhost:5001");
interface Props {
  username: string;
}
const rooms = ["milen", "menli", "baongan", "nganbao"];
const Example02 = () => {
  const [connectChat, setConnectChat] = useState<boolean>(false);
  const [username, setUserName] = useState("" as string);
  const [defaultRoom, setDefaultRoom] = useState(rooms[0]);
  
  const handleUserName = (name: string) => {
    setUserName(name)
  }
  const handleJoinToChat = () => {
    setConnectChat(true);
    socket.emit("join_server", username);
    socket.emit("join_room", defaultRoom, (roomMsg: any) => {
      console.log(roomMsg,'roomMsg')
    });
  };

  const joinToRoomType = () => {};

  const sendMessage = () => {};
  return (
    <div>
      <JoinToChat getUserName={(e: string) => handleUserName(e)} handleJoinToChat={handleJoinToChat} />
      <FormChat />
    </div>
  );
};

export default Example02;
