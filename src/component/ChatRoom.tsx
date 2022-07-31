import React, { useEffect, useState } from "react";
import useSocket from "../hook/useSocket";

interface Props {
  socket: any;
  username: string;
  room: number | string;
}

const ChatRoom = ({ socket, username, room }: Props) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([] as any);
  const [name, setName] = useState([] as any);
  const [nameDis, setNameDis] = useState([] as any);
  const { getData, sendData, getDataBack } = useSocket();

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      // setMessageList((list: any) => [...list, messageData]);
    }
  };
  const onClose = async () => {
    await socket.emit("disconnect", {room, username});
  }
  useEffect(() => {
    socket.on("receive_message", (data: any) => {
      // setMessageReceived(data.message);
      setMessageList((list: any) => [...list, data]);
      console.log(data, "data");
    });
    const reice = getDataBack("receive_message")
  console.log({getData, reice})
    socket.on("user-connected", (data: any) => {
      setName((list: any) => [...list, data.user]);
    });
    socket.on("user-disconnected", (name: any) => {
      console.log(name, 'heheh')
    });
  }, [getDataBack, socket, username]);
  return (
    <div>
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      {name && <span>{name} is connected</span>}
      <div className="chat-body">
        {messageList.map((msg: any) => {
          return <h1>{msg.message}</h1>;
        })}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          className="chat-input"
          placeholder="message..."
          onChange={(event) => setCurrentMessage(event.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <button onClick={onClose}>Leave</button>
    </div>
  );
};

export default ChatRoom;
