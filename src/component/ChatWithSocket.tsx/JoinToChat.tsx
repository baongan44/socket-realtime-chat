import React, { useState } from "react";

interface Props {
  getUserName: any;
  handleJoinToChat: any;
}
const JoinToChat = ({ getUserName, handleJoinToChat }: Props) => {
  return (
    <div>
      <h1>Join To Chat</h1>
      <div>
        <input
          type="text"
          placeholder="enter your name..."
          onChange={(e) => getUserName(e.target.value)}
        />
        <button onClick={handleJoinToChat}>Login</button>
      </div>
    </div>
  );
};

export default JoinToChat;
