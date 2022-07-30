import React, { useState } from "react";
import "./App.css";
import { useWebSockets } from "./hooks/useWebSockets";
import Example from "./component/example";
import SocketConnect from "./component/socketConnect";
import ChatRoom2 from "./component/ChatRoom2";

function App() {
  return (
    <>
    {/* 1 <SocketConnect/> */}
    <Example />
    </>
  );
}

export default App;
