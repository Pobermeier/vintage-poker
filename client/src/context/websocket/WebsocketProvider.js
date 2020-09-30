import React, { useState, useEffect, useContext } from 'react';
import authContext from '../auth/authContext';
import SocketContext from './socketContext';
import io from 'socket.io-client';
import {
  DISCONNECT,
  FETCH_LOBBY_INFO,
  PLAYERS_UPDATED,
  RECEIVE_LOBBY_INFO,
  TABLES_UPDATED,
} from '../../pokergame/actions';
import globalContext from '../global/globalContext';
import config from '../../clientConfig';

const WebSocketProvider = ({ children }) => {
  const { isLoggedIn } = useContext(authContext);
  const { setTables, setPlayers } = useContext(globalContext);

  const [socket, setSocket] = useState(null);
  const [socketId, setSocketId] = useState(null);

  useEffect(() => {
    window.addEventListener('beforeunload', cleanUp);
    window.addEventListener('beforeclose', cleanUp);
    return () => cleanUp();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      const token = localStorage.token;
      const webSocket = socket || connect();

      token && webSocket && webSocket.emit(FETCH_LOBBY_INFO, token);
    } else {
      cleanUp();
    }
    return () => cleanUp();
    // eslint-disable-next-line
  }, [isLoggedIn]);

  function cleanUp() {
    window.socket && window.socket.emit(DISCONNECT);
    window.socket && window.socket.close();
    setSocket(null);
    setSocketId(null);
    setPlayers(null);
    setTables(null);
  }

  function connect() {
    const socket = io(config.socketURI, {
      transports: ['websocket'],
      upgrade: false,
    });
    registerCallbacks(socket);
    setSocket(socket);
    window.socket = socket;
    return socket;
  }

  function registerCallbacks(socket) {
    socket.on(RECEIVE_LOBBY_INFO, ({ tables, players, socketId }) => {
      console.log(RECEIVE_LOBBY_INFO, tables, players, socketId);
      setSocketId(socketId);
      setTables(tables);
      setPlayers(players);
    });

    socket.on(PLAYERS_UPDATED, (players) => {
      console.log(PLAYERS_UPDATED, players);
      setPlayers(players);
    });

    socket.on(TABLES_UPDATED, (tables) => {
      console.log(TABLES_UPDATED, tables);
      setTables(tables);
    });
  }

  return (
    <SocketContext.Provider value={{ socket, socketId, cleanUp }}>
      {children}
    </SocketContext.Provider>
  );
};

export default WebSocketProvider;
