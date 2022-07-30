import React, { useEffect, useRef, useState } from "react";
import immer from "immer";
import { IncomingMessage } from "http";
import { io } from "socket.io-client";
import ChatForm from "./ChatForm";
import Form from "./Form";

interface messContent {
  content: any;
  sender: any;
  chatName: any;
}

const ChatRoom2 = ({ socket }: { socket: any }) => {
  const initialMessageState = {
    general: [],
    random: [],
    jokes: [],
    javascripts: [],
  };
  const [username, setUserName] = useState("");
  const [connected, setConnected] = useState(false);
  const [currentChat, setCurrentChat] = useState({
    isChannel: true,
    chatName: "general",
    receiveId: "",
  });
  const [connectedRoom, setConnectedRoom] = useState(["general"]);
  const [allUsers, setAllUsers] = useState([] as Array<string>);
  const [messages, setMessages] = useState(initialMessageState as any);
  const [message, setMessage] = useState("");
  const socketRef = useRef();

  // function
  const handleMessageChange = (e: any) => {
    setMessage(e.target.value);
  };
  // useEffect(() => {
  //   sendMessage("");
  // }, [message]);
  const sendMessage = () => {
    const payload = {
      content: message,
      to: currentChat.isChannel ? currentChat.chatName : currentChat.receiveId,
      sender: username,
      chatName: currentChat.chatName,
      isChannel: currentChat.isChannel,
    };
    socket.emit("send_message", payload);
    const newMessage = immer(messages, (draft: any) => {
      draft[currentChat.chatName].push({
        sender: username,
        content: message,
      });
    });
    setMessages(newMessage);
  };
  const roomJoinCallback = (incomingMessage: any, room: any) => {
    const newMessage = immer(messages, (draft: any) => {
      draft[room] = incomingMessage;
    });
    setMessages(newMessage);
  };
  const joinRoom = (room: any) => {
    const newConnectedRooms = immer(connectedRoom, (draft) => {
      draft.push(room);
    });
    socket.emit("join_room", room, (messages: any) => {
      roomJoinCallback(message, room);
    });
    setConnectedRoom(newConnectedRooms);
  };

  const toggleChat = (currentChat: any) => {
    if (!messages[currentChat.chatName]) {
      const newMessage = immer(messages, (draft: any) => {
        draft[currentChat.chatName] = [];
      });
      setMessages(newMessage);
    }
    setCurrentChat(currentChat);
  };
  // function form
  const handleChange = (e: any) => {
    setUserName(e.target.value);
  };
  const connect = () => {
    setConnected(true);
    socket.emit("join_server", username);
    socket.emit("join_room", "general", (message: any) => {
      roomJoinCallback(message, "general");
    });
    socket.on("new_user", (allUsers: any) => {
      setAllUsers(allUsers);
    });
    socket.on(
      "receive_message",
      ({ content, sender, chatName }: messContent) => {
        setMessages((messages: any) => {
          const newMessage = immer(messages, (draft: any) => {
            if (draft[chatName]) {
              draft[chatName]?.push({ content, sender });
              // console.log(draft[chatName], 'draft[chatName]')
            } else {
              draft[chatName] = [{ content, sender }];
            }
          });
          console.log(newMessage, 'newMessage')
          return newMessage;
        });
      }
    );
  };
  let body;
  console.log(typeof messages[currentChat.chatName])
  if (connected) {
    body = (
      <ChatForm
        message={message}
        handleMessageChange={handleMessageChange}
        sendMessage={sendMessage}
        yourId={socket ? socket.id : ""}
        allUsers={allUsers}
        joinRoom={joinRoom}
        connectedRooms={connectedRoom}
        currentChat={currentChat}
        toggleChat={toggleChat}
        messages={messages[currentChat.chatName]}
      />
    );
  } else {
    body = (
      <Form username={username} onChange={handleChange} connect={connect} />
    );
  }
  return <div>{body}</div>;
};

export default ChatRoom2;
