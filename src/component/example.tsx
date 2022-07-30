import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { listChat } from "../dataFake/listChat";
import ChatRoom from "./ChatRoom";
import ChatRoom2 from "./ChatRoom2";
import Example02 from "./ChatWithSocket.tsx/Example02";

const socket = io("http://localhost:5001");

const Example = () => {
  //Room State
  const [room, setRoom] = useState("");
  // Messages States
  const [user, setUser] = useState("");
  const userConnect = () => {
    socket.emit("new-user-connect", { user, room });
  };
  const joinRoom = () => {
    if (room !== "" && user !== "") {
      socket.emit("join_room", room);
      userConnect()
    }
  };
  return (
    <>
      <div className="App">
        {/* <div>
          <input
            type="text"
            placeholder="Your name..."
            onChange={(e) => setUser(e.target.value)}
          />
          <input
            placeholder="Room Number..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join Room</button>
        </div> */}
        <br />
        {/* <input
          placeholder="Message..."
          onChange={(event) => {
            setMessage(event.target.value);
          }}
        />
        <button onClick={sendMessage}> Send Message</button>
        <h1>
          {" "}
          Message:
          {messageReceived}
        </h1>
        <h1> User: {`${userRender} invited`}</h1> */}
        {/* <ChatRoom socket={socket} username={user} room={room} /> */}
        {/* <ChatRoom2 socket={socket} /> */}
        <Example02 />
      </div>
      {/* <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <div style={{ flex: "20%" }}>
          {listChat.map((ele: any) => (
            <div>
              <div key={ele.id} className={`chat-room`}>
                {ele.name}
              </div>
            </div>
          ))}
        </div>
        <div style={{ flex: "80%"}} className="send-tag">
          
          <input type="text" placeholder="message"/>
          <button>Send</button>
        </div>
      </div> */}
    </>
  );
};

export default Example;
