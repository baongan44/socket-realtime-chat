import React from "react";

const rooms = ["general", "random", "joker", "javascripts"];

const ChatForm = (props: any) => {
  const handleClickRoom = (room: any) => {
    const currentChat = {
      chatName: room,
      isChannel: true,
      receiveId: "",
    };
    props?.toggleChat(currentChat);
  };
  const renderUser = (user: any) => {
    if (user.id === props?.yourId) {
      return <div key={user.id}>You: {user.username}</div>;
    }
    const currentChat = {
      chatName: user,
      isChannel: true,
      receiveId: user.id,
    };
    return (
      <div key={user.id} onClick={props?.toggleChat(currentChat)}>
        {user.username}
      </div>
    );
  };
  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      props?.sendMessage();
    }
  };
  let body;
  console.log(typeof props?.messages,props?.messages, 'props?.currentChat.chatName')
  if (
    !props?.currentChat.isChannel ||
    props?.connectedRooms?.includes(props?.currentChat.chatName)
  ) {
    body = (
      <div>
        {props?.messages.map((mes: any, i: number) => (
          <div key={i}>
            <h3>{mes.sender}</h3>
            <p>{mes.content}</p>
          </div>
        ))}
      </div>
    );
  } else {
    body = (
      <button onClick={() => props?.joinRoom(props?.currentChat.chatName)}>
        Join {props?.activeChannel}
      </button>
    );
  }
  return (
    <div>
      <div className="side-bar">
        <h1>CHAT ROOM CHANNELS</h1>
        <h3>Channels</h3>
        {rooms.map((room: any) => (
          <div key={room} onClick={() => handleClickRoom(room)}>
            {room}
          </div>
        ))}
        <h3>All users</h3>
        {/* {props?.allUsers?.map(renderUser)} */}
      </div>
      <div>
        <h3>Channel info: {props?.currentChat.chatName}</h3>
        <div>{body}</div>
        <input
          type="text"
          value={props?.message}
          onKeyPress={handleKeyPress}
          placeholder="text here..."
          onChange={props?.handleMessageChange}
        />
      </div>
    </div>
  );
};

export default ChatForm;
