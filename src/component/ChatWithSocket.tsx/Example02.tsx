import immer from "immer";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import useSocket from "../../hook/useSocket";
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
  const { getData, sendData, getDataBack } = useSocket();
  const handleUserName = (name: string) => {
    setUserName(name);
  };
  const joinRoomCallBack = (roomCheck: any, room: string) => {
    const newRoom = immer(roomCheck, (draft: any) => {
      console.log(roomCheck, draft, "immer");
    });
    console.log(roomCheck, room, "gehhe");
  };
  console.log(getData, "getData");
  const handleJoinToChat = () => {
    setConnectChat(true);
    // socket.emit("join_server", username);
    sendData(username, "join_server");
    socket.emit("join_room", defaultRoom, (roomMsg: any) => {
      console.log(roomMsg, "roomMsg");
      joinRoomCallBack(roomMsg, defaultRoom);
    });
  };

  const joinToRoomType = () => {};

  const sendMessage = () => {};

  return (
    <div>
      <JoinToChat
        getUserName={(e: string) => handleUserName(e)}
        handleJoinToChat={handleJoinToChat}
      />
      <FormChat />
    </div>
  );
};

export default Example02;
