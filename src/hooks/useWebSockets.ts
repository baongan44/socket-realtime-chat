import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

type Props = {
  userId: number;
  enable: boolean;
  onConnected?: () => void;
  url: string;
  roomId: number | string;
};
type Message = {
  content: string;
  valueRoom: any;
  userId: string;
  date: Date;
};

export const useWebSockets = ({
  userId,
  enable,
  onConnected,
  url,
  roomId,
}: Props) => {
  // const ref = useRef<Socket>();
  const [messageReceived, setMessageReceive] = useState("");
  const socket = io(url);

  const room = () => {
    socket.emit("join_room", roomId);
  };
  const send = (message: string) => {
    socket.emit("send_message", {
      content: message,
      roomId: roomId,
    });
  };

  useEffect(() => {
    // receive
    socket.on("receive_message", (data) => {
      setMessageReceive(data.content);
      console.log(data.content);
    });
  }, [socket]);
  console.log(messageReceived,'messageReceived')
  return { send, room, messageReceived };
};
