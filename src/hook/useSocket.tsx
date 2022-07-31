import React, { useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";

const url = process.env.REACT_APP_SOCKET_URL || "";
const socket = io(url);

const useSocket = () => {
  const [getData, setGetData] = useState({});

  const sendData = (emitData: any, topic: string) => {
    socket.emit(topic, emitData);
  };
  const getDataBack = useCallback((topic: string) => {
    socket.on(topic, (data: any) => {
     console.log(data)
    });
    
  }, []);

  console.log({ getData });
  useEffect(() => {
    if (socket) {
      getDataBack("");
    }
  }, [getDataBack]);
  return { getData, sendData, getDataBack };
};

export default useSocket;
