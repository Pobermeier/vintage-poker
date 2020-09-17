import React, { useContext, useEffect, useState } from 'react';
import {
  CALL,
  CHECK,
  FOLD,
  JOIN_TABLE,
  LEAVE_TABLE,
  RAISE,
  SIT_DOWN,
  STAND_UP,
  TABLE_JOINED,
  TABLE_LEFT,
  TABLE_UPDATED,
} from '../../pokergame/actions';
import socketContext from '../websocket/socketContext';
import GameContext from './gameContext';

const GameState = ({ children }) => {
  const { socket } = useContext(socketContext);

  const [messages, setMessages] = useState([]);
  const [currentTable, setCurrentTable] = useState(null);
  const [isPlayerSeated, setIsPlayerSeated] = useState(false);

  useEffect(() => {
    return () => leaveTable();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on(TABLE_UPDATED, ({ table, message, from }) => {
        console.log(TABLE_UPDATED, table, message, from);
        setCurrentTable(table);
        message && addMessage(message);
      });

      socket.on(TABLE_JOINED, ({ tables, tableId }) => {
        console.log(TABLE_JOINED, tables, tableId);
        setCurrentTable(tables[tableId]);
      });

      socket.on(TABLE_LEFT, ({ tables, tableId }) => {
        console.log(TABLE_LEFT, tables, tableId);
        setCurrentTable(null);
      });
    }
    // eslint-disable-next-line
  }, [socket]);

  const joinTable = (tableId) => {
    socket.emit(JOIN_TABLE, tableId);
  };

  const leaveTable = () => {
    isPlayerSeated && standUp();
    setCurrentTable(null);
    setMessages(null);
    socket.emit(LEAVE_TABLE, currentTable.id);
  };

  const sitDown = (tableId, seatId, amount) => {
    socket.emit(SIT_DOWN, { tableId, seatId, amount });
    setIsPlayerSeated(true);
  };

  const standUp = () => {
    socket.emit(STAND_UP, currentTable.id);
    setIsPlayerSeated(false);
  };

  const addMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const fold = () => {
    socket.emit(FOLD, currentTable.id);
  };

  const check = () => {
    socket.emit(CHECK, currentTable.id);
  };

  const call = () => {
    socket.emit(CALL, currentTable.id);
  };

  const raise = (amount) => {
    socket.emit(RAISE, { tableId: currentTable.id, amount });
  };

  return (
    <GameContext.Provider
      value={{
        messages,
        currentTable,
        isPlayerSeated,
        joinTable,
        leaveTable,
        sitDown,
        standUp,
        addMessage,
        fold,
        check,
        call,
        raise,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameState;
